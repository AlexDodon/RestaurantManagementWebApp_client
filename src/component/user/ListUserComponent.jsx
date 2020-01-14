import React, { Component } from 'react';
import UserApiService from "../../service/UserApiService";

class ListUserComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            message: null
        };
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.reloadUserList = this.reloadUserList.bind(this);
    }

    componentDidMount() {
        this.reloadUserList();
    }

    reloadUserList() {
        UserApiService.fetchUsers()
            .then((res) => {
                console.log(res.data);
                this.setState({users: res.data})
            });
    }

    deleteUser(userId) {
        UserApiService.deleteUser(userId)
           .then(res => {
               console.log(res);
               this.setState({message : 'User deleted successfully.'});
               this.setState({users: this.state.users.filter(user => user.id !== userId)});
           })

    }

    editUser(id) {
        window.localStorage.setItem("userId", id);
        this.props.history.push('/general/edit-user');
    }

    addUser() {
        window.localStorage.removeItem("userId");
        this.props.history.push('/general/add-user');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">User Details</h2>
                <button className="btn btn-danger" onClick={() => this.addUser()}> Add User</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="hidden">Id</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Username</th>
                            <th>Roles</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.users.map(
                        user =>
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.username}</td>
                                        <td>{user.roles}</td>
                                        <td> 
                                            <button className="btn btn-success" onClick={() => this.deleteUser(user.id)}> Delete</button>
                                            <button className="btn btn-success" onClick={() => this.editUser(user.id)}> Edit</button>
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

export default ListUserComponent;
