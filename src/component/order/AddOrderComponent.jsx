import React, { Component } from 'react'
import OrderApiService from "../../service/OrderApiService";
import MenuItemApiService from "../../service/MenuItemApiService";

class AddOrderComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            id: '',
            waiter: '',
            orderItems: [],
            menuItems: [],
        }
        this.saveOrder = this.saveOrder.bind(this);
        this.reloadMenuItemsList = this.reloadMenuItemsList.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.removeFromOrder = this.removeFromOrder.bind(this);
    }

    addToOrder(itemId) {
        this.setState({orderItems: [...this.state.orderItems, ...this.state.menuItems.filter( item => item.id === itemId)]})
        console.log(this.state.orderItems)
    }

    removeFromOrder(itemId) {
        this.setState({orderItems: this.state.orderItems.filter( item => item.id !== itemId)})
        console.log(this.state.orderItems)
    }

    componentDidMount() {
        this.reloadMenuItemsList();
    }

    reloadMenuItemsList() {
        MenuItemApiService.fetchMenuItems()
            .then((res) => {
                console.log(res.data);
                this.setState({menuItems: res.data})
            });
    }

    saveOrder = (e) => {
        e.preventDefault();
        let order = {
        };
        console.log(order.suppliers);
        OrderApiService.addOrder(order)
            .then(res => {
                this.setState({message : 'Order added successfully.'});
                this.props.history.push('/waiter');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <h2 className="text-center">Order Details</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="hidden">Id</th> 
                            <th>Waiter</th>
                            <th>Order Items</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={this.state.id}>
                            <td>{this.state.id}</td>
                            <td>{(this.state.waiter.firstName ? this.state.waiter.firstName : "") + " " + this.state.waiter.lastName ? this.state.waiter.lastName : ""}</td>
                            <td>
                                <ul>
                                    {this.state.orderItems.map( item => 
                                    <li key={item.id}>
                                        {item.name}
                                        <button className="btn btn-success" onClick={() => this.removeFromOrder(item.id)}> Remove</button>
                                    </li>
                                    )}
                                </ul>
                            </td>
                            <td>{this.state.orderItems.length > 0 ? this.state.orderItems.map(item => item.price).reduce((prev, curr) => prev + curr) : ""}</td>
                        </tr>
                    </tbody>
                </table>
                
                <button className="btn btn-success" onClick={this.saveOrder}>Place Order</button>
            <br/>
            <h2 className="text-center">Menu Items Details</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="hidden">Id</th> 
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Ingredients</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.menuItems.map(
                        menuItem =>
                                    <tr key={menuItem.id}>
                                        <td>{menuItem.id}</td>
                                        <td>{menuItem.name}</td>
                                        <td>{menuItem.quantity}</td>
                                        <td>{menuItem.ingredients.map(ingredient => ingredient.name + " | ")}</td>
                                        <td>{menuItem.price}</td>
                                        <td> 
                                            <button className="btn btn-success" onClick={() => this.addToOrder(menuItem.id)}>Add</button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
    </div>
        );
    }
}

export default AddOrderComponent;
