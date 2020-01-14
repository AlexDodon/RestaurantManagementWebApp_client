import React, { Component } from 'react'
import SupplierApiService from "../../service/SupplierApiService";

class EditSupplierComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            name: '',
            location: '',
            telephone: '',
            email: '',
        }
        this.saveSupplier = this.saveSupplier.bind(this);
        this.loadSupplier = this.loadSupplier.bind(this);
    }

    componentDidMount() {
        this.loadSupplier();
    }

    loadSupplier() {
        SupplierApiService.fetchSupplierById(window.localStorage.getItem("supplierId"))
            .then((res) => {
                console.log(res)
                let supplier = res.data;
                console.log(supplier);
                this.setState({
                id: supplier.id,
                name: supplier.name,
                location: supplier.location,
                telephone: supplier.telephone,
                email: supplier.email,
                })
                console.log(this.state);
            });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state)
    }

    saveSupplier = (e) => {
        e.preventDefault();
        let supplier = {id: this.state.id, name: this.state.name, location: this.state.location, telephone: this.state.telephone, email: this.state.email};
        SupplierApiService.editSupplier(supplier)
            .then(res => {
                this.setState({message : 'Supplier added successfully.'});
                this.props.history.push('/logistic/list-supplier');
            });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Edit Supplier</h2>
                <form>
                    <div className="form-group">
                        <label>Name:</label>
                        <input placeholder="Name" name="name" className="form-control" value={this.state.name} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Location:</label>
                        <input placeholder="Location" name="location" className="form-control" value={this.state.location} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>telephone:</label>
                        <input placeholder="Telephone" name="telephone" className="form-control" value={this.state.telephone} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input placeholder="Email" name="email" className="form-control" value={this.state.email} onChange={this.onChange}/>
                    </div>

                    <button className="btn btn-success" onClick={this.saveSupplier}>Save</button>
                </form>
            </div>
        );
    }
}

export default EditSupplierComponent;
