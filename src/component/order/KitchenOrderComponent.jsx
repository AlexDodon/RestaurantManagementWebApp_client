import React, { Component } from 'react';
import OrderApiService from "../../service/OrderApiService";

class KitchenOrderComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            message: null
        };
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

    render() {
        return (
            <div>
                <h2 className="text-center">Order Details</h2>
                <button className="btn btn-success" onClick={() => this.reloadOrderList()}> Refresh</button>
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
                                    </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
        );
    }

}

export default KitchenOrderComponent;
