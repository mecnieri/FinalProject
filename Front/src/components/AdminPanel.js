import React from 'react';
// import {Redirect } from 'react-router-dom';
<<<<<<< HEAD
import './../user.css';
const FETCHURL = 'http://localhost:5000/api/admin/message';

export default class AdminPanel extends React.Component {

  
  state = {
    username: null,
    email: null,
    balance: null,
    birthday: null
  }
  componentDidMount() {
=======
import Tabs from './Tabs';
import './../user.css';
// import '../css/Tabs.css';
export default class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      email: null,
      balance: null,
      birthday: null,
      cart: null
    }
    this.handleUserSearch = this.handleUserSearch.bind(this);
  }
  handleUserSearch(e) {
    e.preventDefault();
    let query;
    query = e.target.children[0].childNodes[1].value;
    let FETCHURL = `http://localhost:5000/api/users/${query}`;
>>>>>>> origin/master
    fetch(FETCHURL, {
      method: 'get',
      headers: new Headers({
        'Authorization': localStorage.getItem("Authorized")
      })
    })
<<<<<<< HEAD
    .then(res => res.json())
    .then(user => {
=======
      .then(res => res.json())
      .then(user => {
>>>>>>> origin/master
        this.setState({
          username: user.username,
          email: user.email,
          balance: user.balance,
<<<<<<< HEAD
=======
          cart: user.cart.length
>>>>>>> origin/master
        })
      })
      .catch(err => console.log(err))
  }

<<<<<<< HEAD

  render() {
    return (
    <div className="co">
        <div className="user-container">
          
          <h2><i className="fas fa-user-tie"></i> Admin Panel</h2>
           {/* <h3><i className="fas fa-shopping-cart"></i>Cart</h3> */}
          <table className="table">
          <tbody>
            <tr>
              <th>User List</th>
              <th>Cart</th>
              <th>Bought Product</th>
              <th>Contact</th>
            </tr>
            <tr>
              <td>{this.state.username}</td>
              <td>{this.state.email}</td>
              <td>{this.state.balance}</td>
              <td className="message"><i className="fas fa-file-signature"></i></td>
            </tr>
            </tbody>
          </table>
        
      
        <form className="textarea">
          <textarea></textarea>
          <button className="btn btn-success">Send Message</button>
        </form>
    </div>
    </div>
        )
    }
}
    
=======
  handleEditUser(e) {
    e.preventDefault()
    let FETCHURL = `http://localhost:5000/api/users`;
debugger
    console.log(username)
     let username = e.target.children[0].value
    fetch(FETCHURL, {
      method: 'put',
      headers: new Headers({
        "Accept": "application/json",
        "Content-Type": "application/json",
        'Authorization': localStorage.getItem("Authorized")
      }),
      body: JSON.stringify({ username })
    })
  }


  handleAddProduct(e) {
    e.preventDefault()
    let FETCHURL = `http://localhost:5000/api/products`;
    let category = e.target.children[0].childNodes[1].value
    let price = e.target.children[0].childNodes[3].value
    let model = e.target.children[0].childNodes[5].value
    let brand = e.target.children[0].childNodes[7].value
    let weight = e.target.children[0].childNodes[9].value
    let size = e.target.children[0].childNodes[11].value
    // let image = e.target.children[0].childNodes[13].value
    console.log(category, price, model, brand, weight, size
    )
    fetch(FETCHURL, {
      method: 'post',
      headers: new Headers({
        "Accept": "application/json",
        "Content-Type": "application/json",
        'Authorization': localStorage.getItem("Authorized")
      }),
      body: JSON.stringify({ category, price, model, brand, weight, size })
    })
  }
  componentDidMount() {
  }
  render() {
    console.log(this.state)
    console.log(this.state.username)
    return (
      <div className="co">
        <div className="user-container">
          <h2><i className="fas fa-user-tie"></i> Admin Panel</h2>
          {/* <h3><i className="fas fa-shopping-cart"></i>Cart</h3> */}
          <Tabs className="admin-panel--tabs">
            <div label="User Search">
              <form onSubmit={this.handleUserSearch}>
                <label className="admin-panel label">
                  Name:  <input type="text" className="name-input" />
                </label>
                <input type="submit" value="Submit" className="submit-input" />
              </form>
              <form onSubmit={this.handleEditUser}>

                <input type="text" placeholder={this.state.username} /><br />
                <input type="text" placeholder={this.state.balance} /><br />
                <input type="text" placeholder={this.state.email} /><br />

                <h1>
                  {this.state.cart > 0 && <h1> cart is active</h1>}
                  {this.state.cart == 0 && <h1> user has no cart</h1>}
                </h1>
                <input type="submit" value="Submit" />
              </form>
            </div>
            <div label="Product Add">
              <form onSubmit={this.handleAddProduct}>
                <label>
                  category:  <input type="text" name="category" />
                  price:  <input type="text" name="price" />
                  model:  <input type="text" name="model" />
                  weight:  <input type="text" name="weight" />
                  size:  <input type="text" name="size" />
                  image:  <input type="text" name="image" />
                </label>
                <input type="submit" value="Submit" />
              </form>
            </div>
            <div label="Edit User">

            </div>
          </Tabs>
          <div>
          </div>
        </div>
      </div>
    )
  }
}
>>>>>>> origin/master
