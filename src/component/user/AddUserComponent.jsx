import React, { Component } from 'react'
import UserApiService from "../../service/UserApiService";

class AddUserComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            firstName: '',
            lastName: '',
            username: '',
            roles: '',
            password: '',
        }
        this.saveUser = this.saveUser.bind(this);
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = {firstName: this.state.firstName, lastName: this.state.lastName, username: this.state.username, roles: this.state.roles, password: this.state.password};
        console.log(user);
        UserApiService.addUser(user)
            .then(res => {
                this.setState({message : 'User added successfully.'});
                this.props.history.push('/general/list-user');
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
                        <label>First Name:</label>
                        <input placeholder="First Name" name="firstName" className="form-control" value={this.state.firstName} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Last Name:</label>
                        <input placeholder="Last name" name="lastName" className="form-control" value={this.state.lastName} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Username:</label>
                        <input placeholder="Username" name="username" className="form-control" value={this.state.username} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Roles:</label>
                        <input placeholder="Roles" name="roles" className="form-control" value={this.state.roles} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input placeholder="Password" name="password" className="form-control" value={this.state.password} onChange={this.onChange}/>
                    </div>
                
                <button className="btn btn-success" onClick={this.saveUser}>Save</button>
            </form>
    </div>
        );
    }
}

export default AddUserComponent;
