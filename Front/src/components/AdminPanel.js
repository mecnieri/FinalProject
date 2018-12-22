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
    this.handleUserSearch = this.handleUserSearch.bind(this);
  }



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
          cart: user.cart.length
        })
      })
      .catch(err => console.log(err))
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
  logic=()=>{
    if(this.state.username==null){
      return <h1>User Not Found!</h1>;
    }
    else{
      return <h1>{this.state.username}</h1>
    }
  }


  render() {
    console.log(this.state)
    console.log(this.state.username)
    return (
      <div className="co">
        <div className="user-container">

          <h2><i className="fas fa-user-tie"></i> Admin Panel</h2>
          {/* <h3><i className="fas fa-shopping-cart"></i>Cart</h3> */}


          <h1>User search</h1>

          <div>
            <form onSubmit={this.handleUserSearch}>
              <label>
                Name:  <input type="text" />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>

          <h1>
            {this.logic}
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


          <h1>Product search</h1>
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
      </div>
    )
  }

}
