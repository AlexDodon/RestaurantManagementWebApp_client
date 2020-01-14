import React, { Component } from 'react'
import MenuItemApiService from "../../service/MenuItemApiService";
import StockApiService from "../../service/StockApiService";

class AddMenuItemComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            id: '',
            name: '',
            quantity: '',
            ingredientsId: '',
            ingredients: [],
            price: ''
        }
        this.saveMenuItem = this.saveMenuItem.bind(this);
        this.reloadStockList = this.reloadStockList.bind(this);
    }

    componentDidMount() {
        this.reloadStockList();
    }

    reloadStockList() {
        StockApiService.fetchStocks()
            .then((res) => {
                console.log(res.data);
                this.setState({ingredients: res.data})
            });
    }

    saveMenuItem = (e) => {
        e.preventDefault();
        let menuItem = {
            id: this.state.id, 
            name: this.state.name, 
            quantity: parseInt(this.state.quantity), 
            price: parseFloat(this.state.price),
            ingredients: this.state.ingredientsId.split(",").map(str => StockApiService.fetchStockById(parseInt(str)).then(res => {
                let stockItem = res.data

                let sRes = {
                    id: stockItem.id,
                    name: stockItem.name,
                    quantity: stockItem.quantity,
                    suppliers: stockItem.suppliers,
                }
                console.log("this")
                console.log(sRes)
                return sRes
            }))
        };
        console.log(menuItem.suppliers);
        MenuItemApiService.addMenuItem(menuItem)
            .then(res => {
                this.setState({message : 'MenuItem added successfully.'});
                this.props.history.push('/general/list-menuItem');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <h2 className="text-center">Add MenuItem Item</h2>
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
                        <label>Stock Item id:</label>
                        <input placeholder="(Comma separated, no spaces)" name="ingredientsId" className="form-control" value={this.state.ingredientsId} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Price:</label>
                        <input placeholder="Price" name="price" className="form-control" value={this.state.price} onChange={this.onChange}/>
                    </div>
                
                <button className="btn btn-success" onClick={this.saveMenuItem}>Save</button>
            </form>
            <br/>
            <h2 className="text-center">Stock Details</h2>
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
                    this.state.ingredients.map(
                    stock =>
                                <tr key={stock.id}>
                                    <td>{stock.id}</td>
                                    <td>{stock.name}</td>
                                    <td>{stock.quantity}</td>
                                    <td>{stock.suppliers.map(supplier => supplier.name + " | ")}</td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
    </div>
        );
    }
}

export default AddMenuItemComponent;
