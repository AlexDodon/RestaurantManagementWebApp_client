import React, { Component } from 'react';
import StockApiService from "../../service/StockApiService";

class ListStockComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            stocks: [],
            message: null
        };
        this.deleteStock = this.deleteStock.bind(this);
        this.editStock = this.editStock.bind(this);
        this.addStock = this.addStock.bind(this);
        this.reloadStockList = this.reloadStockList.bind(this);
    }

    componentDidMount() {
        this.reloadStockList();
    }

    reloadStockList() {
        StockApiService.fetchStocks()
            .then((res) => {
                console.log(res.data);
                this.setState({stocks: res.data})
            });
    }

    deleteStock(StockId) {
        StockApiService.deleteStock(StockId)
           .then(res => {
               this.setState({message : 'Stock deleted successfully.'});
               this.setState({stocks: this.state.stocks.filter(stock => stock.id !== StockId)});
           })

    }

    editStock(id) {
        window.localStorage.setItem("stockId", id);
        this.props.history.push('/logistic/edit-stock');
    }

    addStock() {
        window.localStorage.removeItem("stockId");
        this.props.history.push('/logistic/add-stock');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Stock Details</h2>
                <button className="btn btn-danger" onClick={() => this.addStock()}> Add Stock</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="hidden">Id</th> 
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Suppliers</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.stocks.map(
                        stock =>
                                    <tr key={stock.id}>
                                        <td>{stock.id}</td>
                                        <td>{stock.name}</td>
                                        <td>{stock.quantity}</td>
                                        <td>{stock.suppliers.map(supplier => supplier.name + " | ")}</td>
                                        <td> 
                                            <button className="btn btn-success" onClick={() => this.deleteStock(stock.id)}> Delete</button>
                                            <button className="btn btn-success" onClick={() => this.editStock(stock.id)}> Edit</button>
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

export default ListStockComponent;
