import React, { Component } from 'react';
import MenuItemApiService from "../../service/MenuItemApiService";

class ListMenuItemComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menuItems: [],
            message: null
        };
        this.deleteMenuItem = this.deleteMenuItem.bind(this);
        this.editMenuItem = this.editMenuItem.bind(this);
        this.addMenuItem = this.addMenuItem.bind(this);
        this.reloadMenuItemList = this.reloadMenuItemList.bind(this);
    }

    componentDidMount() {
        this.reloadMenuItemList();
    }

    reloadMenuItemList() {
        MenuItemApiService.fetchMenuItems()
            .then((res) => {
                console.log(res.data);
                this.setState({menuItems: res.data})
            });
    }

    deleteMenuItem(MenuItemId) {
        MenuItemApiService.deleteMenuItem(MenuItemId)
           .then(res => {
               this.setState({message : 'MenuItem deleted successfully.'});
               this.setState({menuItems: this.state.menuItems.filter(menuItem => menuItem.id !== MenuItemId)});
           })

    }

    editMenuItem(id) {
        window.localStorage.setItem("menuItemId", id);
        this.props.history.push('/general/edit-menuItem');
    }

    addMenuItem() {
        window.localStorage.removeItem("menuItemId");
        this.props.history.push('/general/add-menuItem');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Menu Items Details</h2>
                <button className="btn btn-danger" onClick={() => this.addMenuItem()}> Add Menu Item</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="hidden">Id</th> 
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Ingredients</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.menuItems.map(
                        menuItem =>
                                    <tr key={menuItem.id}>
                                        <td>{menuItem.id}</td>
                                        <td>{menuItem.name}</td>
                                        <td>{menuItem.quantity}</td>
                                        <td>{menuItem.ingredients.map(ingredient => ingredient.name + " | ")}</td>
                                        <td>{menuItem.price}</td>
                                        <td> 
                                            <button className="btn btn-success" onClick={() => this.deleteMenuItem(menuItem.id)}> Delete</button>
                                            <button className="btn btn-success" onClick={() => this.editMenuItem(menuItem.id)}> Edit</button>
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

export default ListMenuItemComponent;
