import React, { Component } from 'react';
import OrderApiService from "../../service/OrderApiService";

class ListOrderComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            message: null
        };
        this.deleteOrder = this.deleteOrder.bind(this);
        this.editOrder = this.editOrder.bind(this);
        this.addOrder = this.addOrder.bind(this);
        this.reloadOrderList = this.reloadOrderList.bind(this);
    }

    componentDidMount() {
        this.reloadOrderList();
    }

    reloadOrderList() {
        OrderApiService.fetchOrders()
            .then((res) => {
                console.log(res.data);
                this.setState({orders: res.data})
            });
    }

    deleteOrder(OrderId) {
        OrderApiService.deleteOrder(OrderId)
           .then(res => {
               this.setState({message : 'Order deleted successfully.'});
               this.setState({orders: this.state.orders.filter(order => order.id !== OrderId)});
           })

    }

    editOrder(id) {
        window.localStorage.setItem("orderId", id);
        this.props.history.push('/waiter/edit-order');
    }

    addOrder() {
        window.localStorage.removeItem("orderId");
        this.props.history.push('/waiter/add-order');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Order Details</h2>
                <button className="btn btn-danger" onClick={() => this.addOrder()}> Create Order</button>
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
                    {
                        this.state.orders.map(
                        order =>
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.waiter.firstName + " " + order.waiter.lastName}</td>
                                        <td>
                                            <ul>
                                                {order.orderItems.map( item => 
                                                <li key={item.id}>{item.name}</li>
                                                )}
                                            </ul>
                                        </td>
                                        <td>{order.orderItems.map(item => item.price).reduce((prev, curr) => prev + curr)}</td>
                                        <td> 
                                            <button className="btn btn-success" onClick={() => this.deleteOrder(order.id)}> Bill</button>
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

export default ListOrderComponent;
