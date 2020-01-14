import React, { Component } from 'react'
import StockApiService from "../../service/StockApiService";
import SupplierApiService from "../../service/SupplierApiService";

class AddStockComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            id: '',
            name: '',
            quantity: '',
            suppliersId: '',
            suppliers: []
        }
        this.saveStock = this.saveStock.bind(this);
        this.reloadSupplierList = this.reloadSupplierList.bind(this);
    }

    componentDidMount() {
        this.reloadSupplierList();
    }

    reloadSupplierList() {
        SupplierApiService.fetchSuppliers()
            .then((res) => {
                console.log(res.data);
                this.setState({suppliers: res.data})
            });
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

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <h2 className="text-center">Add Stock Item</h2>
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
                    this.state.suppliers.map(
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

export default AddStockComponent;
