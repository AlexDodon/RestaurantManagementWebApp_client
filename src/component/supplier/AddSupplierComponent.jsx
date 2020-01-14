import React, { Component } from 'react'
import SupplierApiService from "../../service/SupplierApiService";

class AddSupplierComponent extends Component{

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
    }

    saveSupplier = (e) => {
        e.preventDefault();
        let supplier = {id: this.state.id, name: this.state.name, location: this.state.location, telephone: this.state.telephone, email: this.state.email};
        console.log(supplier);
        SupplierApiService.addSupplier(supplier)
            .then(res => {
                this.setState({message : 'Supplier added successfully.'});
                this.props.history.push('/logistic/list-supplier');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <h2 className="text-center">Add User</h2>
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

export default AddSupplierComponent;
