import { Router, Route, Switch } from 'react-router-dom'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { ListUserComponent, EditUserComponent, AddUserComponent } from './user'
import { ListSupplierComponent, EditSupplierComponent, AddSupplierComponent } from './supplier'
import { ListStockComponent, EditStockComponent, AddStockComponent } from './stock'
import { ListMenuItemComponent, EditMenuItemComponent, AddMenuItemComponent } from './menuItem'
import { ListOrderComponent, AddOrderComponent, KitchenOrderComponent } from './order'
import UserApiService from "../service/UserApiService";
import React, { Component } from "react";

class AppRouter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            roles: '',
            message: '',
            users: [],
            history: props.history,
        }

        this.checkLogin = this.checkLogin.bind(this)
        this.toMenu = this.toMenu.bind(this)
        this.toUsers = this.toUsers.bind(this)
        this.toSuppliers = this.toSuppliers.bind(this)
        this.toStock = this.toStock.bind(this)
    }

    toUsers(e) {
        this.state.history.push('/general/list-user');
    }

    toMenu(e) {
        this.state.history.push('/general/list-menuItem');
    }

    toSuppliers(e) {
        this.state.history.push('/logistic/list-supplier');
    }

    toStock(e) {
        this.state.history.push('/logistic/list-stock');
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

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    checkLogin(e) {
        UserApiService.fetchUsers().then(temp => {
            console.log(temp.data)
            this.setState({users: temp.data})
            console.log(this.state)
        })

        let search = this.state.users.filter(user => user.username === this.state.username && user.password === this.state.password)
        console.log(search)

        if (search.length > 0) {
            this.setState({roles: search[0].roles, message: "Logged in!"})
            if (this.state.roles === 'General') {
                this.state.history.push('/general');
            }
            if (this.state.roles === 'Logistics') {
                this.state.history.push('/logistic');
            }
            if (this.state.roles === 'Waiter') {
                this.state.history.push('/waiter');
            }
            if (this.state.roles === 'Chef') {
                this.state.history.push('/chef');
            }
        } else {
            this.setState({message: "Username or Password incorrect"})
        }
    }

    render(){
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Router history={this.state.history}>
                    <div className="col-md-6" >
                        <Switch>
                            <Route path="/" exact>
                                <h1>Log in</h1>
                                <form>
                                    <div className="form-group">
                                        <label>Username:</label>
                                        <input placeholder="Username" name="username" className="form-control" value={this.state.username} onChange={this.onChange}/>
                                    </div>

                                    <div className="form-group">
                                        <label>Password:</label>
                                        <input type="password" placeholder="Password" name="password" className="form-control" value={this.state.password} onChange={this.onChange}/>
                                    </div>
                                </form>  
                                <button className="btn btn-success" onClick={this.checkLogin.bind(this)}>Log in</button>
                                
                                <Box mt={5}>
                                <Typography variant="body2" align="center">
                                    {this.state.message}
                                </Typography>
                                </Box>
                                <Box mt={5}>
                                <Typography variant="body2" color="textSecondary" align="center">
                                    {'Dodon Alexandru & Gatea Andrei'}
                                </Typography>
                                </Box>
                            </Route>
                            
                            <Route path="/general" exact>
                                <button className="btn" onClick={this.toUsers.bind(this)}>Manage Users</button>
                                <button className="btn" onClick={this.toMenu.bind(this)}>Manage Menu</button>
                            </Route>
                            <Route path="/general/list-user" exact component={ListUserComponent} />
                            <Route path="/general/edit-user" exact component={EditUserComponent} />
                            <Route path="/general/add-user" exact component={AddUserComponent} />
                            <Route path="/general/list-menuItem" exact component={ListMenuItemComponent} />
                            <Route path="/general/edit-menuItem" exact component={EditMenuItemComponent} />
                            <Route path="/general/add-menuItem" exact component={AddMenuItemComponent} />

                            <Route path="/logistic" exact>
                                <button className="btn" onClick={this.toSuppliers.bind(this)}>Manage Suppliers</button>
                                <button className="btn" onClick={this.toStock.bind(this)}>Manage Stock</button>
                            </Route>
                            <Route path="/logistic/list-supplier" exact component={ListSupplierComponent} />
                            <Route path="/logistic/edit-supplier" exact component={EditSupplierComponent} />
                            <Route path="/logistic/add-supplier" exact component={AddSupplierComponent} />
                            <Route path="/logistic/list-stock" exact component={ListStockComponent} />
                            <Route path="/logistic/edit-stock" exact component={EditStockComponent} />
                            <Route path="/logistic/add-stock" exact component={AddStockComponent} />

                            <Route path="/waiter" exact component={ListOrderComponent} />
                            <Route path="/waiter/add-order" exact component={AddOrderComponent} />

                            <Route path="/chef" exact component={KitchenOrderComponent} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default AppRouter;
