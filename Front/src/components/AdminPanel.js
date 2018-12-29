import React from 'react';
// import {Redirect } from 'react-router-dom';
import Tabs from './Tabs';
import './../user.css';
import AdminProducts from './AdminProducts';
import {Redirect, Link} from 'react-router-dom';
import AdminContact from './AdminContact';
import Pagination from "../../node_modules/react-js-pagination";
import BoughtProducts from "./BoughtProducts";
// import '../css/Tabs.css';
export default class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      email: null,
      balance: null,
      birthday: null,
      cart: null,
      products: [],
      showLogin: true,
      productsAd: null,
      activePageAd: 1

    }
    this.handleUserSearch = this.handleUserSearch.bind(this);
    this.handleEditUser = this.handleEditUser.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.handleAddProduct = this.handleAddProduct.bind(this);
  }
  redirect=()=>{
    return <Redirect to={{
      pathname: "/BoughtProducts",
    }}/>
  }
  AdminSearchHandler = e => {
    e.preventDefault();
    let query;
    if (e.target.tagName === "LI") {
      query = e.target.textContent.slice(0, -1).toLowerCase();
    } else {
      query = e.target.elements.search2.value.toLowerCase();
    }
    let FETCHURL = `http://localhost:5000/api/products/${query}`;
    fetch(FETCHURL)
      .then(res => res.json())
      .then(adminProducts => {
        this.setState({ adminProducts });
      })
      .catch(err => console.log(err));
  };


  handleUserSearch(e) {
    e.preventDefault();
    let query;
    query = e.target.children[0].childNodes[1].value;
    let FETCHURL = `http://localhost:5000/api/users/${query}`;
    fetch(FETCHURL, {
      method: 'get',
      headers: new Headers({
        'Authorization': localStorage.getItem("Authorized")
      })
    })
      .then(res => res.json())
      .then(user => {
        this.setState({
          username: user.username,
          email: user.email,
          balance: user.balance,
          cart: user.cart.length,
          birthday: user.birthday,
          id: user._id
        })
      })
      .catch(err => console.log(err))
  }
  handleEditUser(e) {
    e.preventDefault()
    let FETCHURL = `http://localhost:5000/api/users`;
    let username = e.target.children[0].childNodes[1].value
    let balance = e.target.children[1].childNodes[1].value
    let birthday = e.target.children[2].childNodes[1].value
    this.setState({birthday: e.target.children[2].childNodes[1].value})
    e.target.children[2].childNodes[1].value = '';
    let userId = this.state.id;
    fetch(FETCHURL, {
      method: 'put',
      headers: new Headers({
        "Accept": "application/json",
        "Content-Type": "application/json",
        'Authorization': localStorage.getItem("Authorized")
      }),
      body: JSON.stringify({
        id: userId,
        username: username,
        balance: balance,
        birthday: birthday
      })
    })
  }
  handleDeleteUser(e) {
    e.preventDefault()
    let userId = this.state.id
    let FETCHURL = `http://localhost:5000/api/users/`;
    fetch(FETCHURL, {
      method: 'delete',
      headers: new Headers({
        "Accept": "application/json",
        "Content-Type": "application/json",
        'Authorization': localStorage.getItem("Authorized")
      }),
      body: JSON.stringify({
        id: userId
      })
    })
  }
  handleAddProduct(e) {
    e.preventDefault()
    let FETCHURL = `http://localhost:5000/api/products`;

    let category = e.target.elements.category.value
    let price = e.target.elements.price.value
    let brand = e.target.elements.brand.value
    let model = e.target.elements.model.value
    let weight = e.target.elements.weight.value
    let size = e.target.elements.size.value
    // let price = e.target.children[0].childNodes[3].value
    // let model = e.target.children[0].childNodes[5].value
    // let brand = e.target.children[0].childNodes[7].value
    // let weight = e.target.children[0].childNodes[9].value
    // let size = e.target.children[0].childNodes[11].value
    fetch(FETCHURL, {
      method: 'post',
      headers: new Headers({
        "Accept": "application/json",
        "Content-Type": "application/json",
        'Authorization': localStorage.getItem("Authorized")
      }),
      body: JSON.stringify({ category: category, price, model, brand, weight, size })
    })
  }
  componentDidMount() {
  }
  handlePageChange(pageNumber) {
    this.setState({ activePageAd: pageNumber })
  }
  render() {
    return (
      <div className="co">
        <div className="user-container">
          <h2><i className="fas fa-user-tie"></i> Admin Panel</h2>
          {/* <h3><i className="fas fa-shopping-cart"></i>Cart</h3> */}
          <Tabs className="admin-panel--tabs">
            <div label="User Search">
              <div className="user-find">
                <form onSubmit={this.handleUserSearch} className="search-user-form ">
                  <label className="admin-panel label search-user"><p>Search Username:</p>
                    <input type="text" className="name-input form-control" placeholder="Search for user by name" />
                  </label>
                  <input type="submit" value="Search" className="submit-input btn btn-primary" />
                </form>
                <form onSubmit={this.handleEditUser} className="edit-user">
                  <div className="user-username"><p>Username:</p>
                    <input type="text" placeholder={this.state.username} className="form-control" /><br />
                  </div>
                  <div className="user-balance"><p>Balance:</p>
                    <input type="number" placeholder={this.state.balance} className="form-control" /><br />
                  </div>
                  <div className="user-birthday"><p>Birthday: {this.state.birthday && this.state.birthday.substring(0, 10)}</p>
                    <input type="date"  className="form-control" /><br />
                  </div>
                  <h1>
                    {this.state.cart > 0 && <h1> User Has an Active Cart</h1>}
                    {this.state.cart === 0 && <h1 className="empty-cart"> User's Cart is empty</h1>}
                  </h1>
                  {/* <button onClick={this.handleDeleteUser} value="Delete User" className="btn btn-danger" /> */}
                  <input type="submit" value="Save Changes" className=" btn btn-primary change-user-btn" />
                  <button onClick={this.handleDeleteUser} value="X" className="btn btn-danger delete-user-btn">Delete User</button>
                </form>
              </div>

            </div>
            <div label="Product Add">
              <div className="product-add">

                <form onSubmit={this.handleAddProduct} className="add-product-form">
                  <label>
                    <div className="product-add-inputs">
                      <p>Category:</p>
                      <input type="text" name="category" className="form-control" required/>
                    </div>
                    <div className="product-add-inputs">
                      <p>Price:</p>
                      <input type="number" name="price" className="form-control" required/>
                    </div>
                    <div className="product-add-inputs">
                      <p>Brand:</p>
                      <input type="text" name="brand" className="form-control" required/>
                    </div>
                    <div className="product-add-inputs">
                      <p>Model:</p>
                      <input type="text" name="model" className="form-control" required/>
                    </div>
                    <div className="product-add-inputs">
                      <p>Weight:</p>
                      <input type="text" name="weight" className="form-control" />
                    </div>
                    <div className="product-add-inputs">
                      <p>Size:</p>
                      <input type="text" name="size" className="form-control" />
                    </div>
                    <div className="product-add-inputs">
                      <p>Image (url):</p>
                      <input type="text" name="image" className="form-control" />
                    </div>
                  </label>
                  <input type="submit" value="Add Product" className="btn btn-primary add-product-btn" />
                </form>
              </div>

            </div>







            <div label="Product edit">
              <div className="product-edit">
                <form className="search" action="" onSubmit={this.AdminSearchHandler}>
                  <div className="inputAndAll">

                    <input className="search-input" type="text" placeholder="Search for products" name="search2" />

                    <button type="submit" className="search-btn"><i className="fa fa-search"></i></button>

                  </div>
                  <div>
                    <AdminProducts adminProducts={this.state.adminProducts} number={this.state.activePageAd} />
                    <div className="page-turner">
                      <Pagination
                        activePageAd={this.state.activePageAd}
                        itemsCountPerPage={10}
                        totalItemsCount={450}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div label="Contact User">
            <AdminContact />
            </div>
            <div label="Bought Products" style={{overflow:'hidden'}}>
            <BoughtProducts id={this.state.id}/>
            </div>
          </Tabs>
          <div>
          </div>
        </div>
      </div>
    )
  }
}