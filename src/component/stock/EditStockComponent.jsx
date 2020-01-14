import React, { Component } from 'react'
import StockApiService from "../../service/StockApiService";
import SupplierApiService from "../../service/SupplierApiService";

class EditStockComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            name: '',
            quantity: '',
            suppliersId: '',
            suppliers: [],
            all: [],
        }
        this.saveStock = this.saveStock.bind(this);
        this.loadStock = this.loadStock.bind(this);
        this.reloadSupplierList = this.reloadSupplierList.bind(this);
    }

    componentDidMount() {
        this.loadStock();
        this.reloadSupplierList();
    }

    reloadSupplierList() {
        SupplierApiService.fetchSuppliers()
            .then((res) => {
                console.log(res.data);
                this.setState({all: res.data})
            });
    }

    loadStock() {
        StockApiService.fetchStockById(window.localStorage.getItem("stockId"))
            .then((res) => {
                let stock = res.data;
                console.log(stock);
                this.setState({
                id: stock.id,
                name: stock.name,
                quantity: stock.quantity,
                suppliers: stock.suppliers,
                suppliersId: stock.suppliers.map(supplier => supplier.id).reduce((prev,curr) => prev + "," + curr),
                })
                console.log(this.state);
            });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state)
    }

    saveStock = (e) => {
        e.preventDefault();
        let stock = {
            id: this.state.id, 
            name: this.state.name, 
            quantity: parseInt(this.state.quantity), 
            suppliers: this.state.suppliersId.split(",").map(str => SupplierApiService.fetchSupplierById(parseInt(str)).then(res => {
                let supplier = res.data

                let sRes = {email: supplier.email, id: supplier.id, location: supplier.location, name: supplier.name, telephone: supplier.telephone}
                console.log("this")
                console.log(sRes)
                return sRes
            }))
        };
        console.log(stock.suppliers);
        StockApiService.addStock(stock)
            .then(res => {
                this.setState({message : 'Stock added successfully.'});
                this.props.history.push('/logistic/list-stock');
            });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Edit Stock</h2>
                <form>
                    <div className="form-group">
                        <label>Name:</label>
                        <input placeholder="Name" name="name" className="form-control" value={this.state.name} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Quantity:</label>
                        <input placeholder="Quantity" name="quantity" className="form-control" value={this.state.quantity} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Suppliers id:</label>
                        <input placeholder="(Comma separated, no spaces)" name="suppliersId" className="form-control" value={this.state.suppliersId} onChange={this.onChange}/>
                    </div>

                    <button className="btn btn-success" onClick={this.saveStock}>Save</button>
                </form>
                <br/>
                <h2 className="text-center">Supplier Details</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="hidden">Id</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Telephone</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.all.map(
                        supplier =>
                                    <tr key={supplier.id}>
                                        <td>{supplier.id}</td>
                                        <td>{supplier.name}</td>
                                        <td>{supplier.location}</td>
                                        <td>{supplier.telephone}</td>
                                        <td>{supplier.email}</td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default EditStockComponent;
