import React from 'react';
// import {Redirect } from 'react-router-dom';
import './../user.css';

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
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleSubmit(e) {
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
          cart: user.cart.length
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    console.log(this.state);
    console.log(this.state.username);
    return (
      <div className="co">
        <div className="user-container">
          <h2><i className="fas fa-user-tie"></i> Admin Panel</h2>
          {/* <h3><i className="fas fa-shopping-cart"></i>Cart</h3> */}
          <h1>User search</h1>
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                Name:  <input type="text" onChange={this.handleChange} name="saxeli" />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>

          <h1>
            {this.state.username}
          </h1>
          <h1>
            {this.state.email}
          </h1>
          <h1>
            {this.state.balance}
          </h1>
          <h1>
            {this.state.cart > 0 && <h1> cart is active</h1>}
            {this.state.cart == 0 && <h1> user has no cart</h1>}
          </h1>
        </div>
      </div >
    )
  }

}