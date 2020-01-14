import React, { Component } from 'react';
import SupplierApiService from "../../service/SupplierApiService";

class ListSupplierComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            suppliers: [],
            message: null
        };
        this.deleteSupplier = this.deleteSupplier.bind(this);
        this.editSupplier = this.editSupplier.bind(this);
        this.addSupplier = this.addSupplier.bind(this);
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

    deleteSupplier(SupplierId) {
        SupplierApiService.deleteSupplier(SupplierId)
           .then(res => {
               this.setState({message : 'Supplier deleted successfully.'});
               this.setState({suppliers: this.state.suppliers.filter(supplier => supplier.id !== SupplierId)});
           })

    }

    editSupplier(id) {
        window.localStorage.setItem("supplierId", id);
        this.props.history.push('/logistic/edit-supplier');
    }

    addSupplier() {
        window.localStorage.removeItem("supplierId");
        this.props.history.push('/logistic/add-supplier');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Supplier Details</h2>
                <button className="btn btn-danger" onClick={() => this.addSupplier()}> Add Supplier</button>
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
                                        <td> 
                                            <button className="btn btn-success" onClick={() => this.deleteSupplier(supplier.id)}> Delete</button>
                                            <button className="btn btn-success" onClick={() => this.editSupplier(supplier.id)}> Edit</button>
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

export default ListSupplierComponent;
