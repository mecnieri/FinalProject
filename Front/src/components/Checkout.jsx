import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css";

class Checkout extends Component {
  state = {
    user: null
  };
  componentDidMount() {
    fetch('http://localhost:5000/api/users/current', {
        method:"GET",
        headers: new Headers({
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': localStorage.getItem("Authorized")
          }),
    })
    .then( res => res.json() )
    .then(user => {this.setState ({user})})
  }
  handleCheckout() {
      //send request to server, update balance, 
  }
  render() {
    if (this.state.user) {
      return (
        <section className="checkout container">
          <div className="checkout--header">
            <h2>Checkout</h2>
          </div>
          <div className="checkout--billing-address">
            <h2>Shipping Address</h2>
            <hr />
            <p>Country *</p>
            <select>
              <option value="Georgia">Georgia</option>
              <option value="Israel">Israel</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Spain">Spain</option>
              <option value="Germany">Germany</option>
              <option value="Italy">Italy</option>
              <option value="France">France</option>
              <option value="Turkey">Turkey</option>
              <option value="Russia">Russia</option>
            </select>
            <div className="username">
              <div className="first">
                <p>First Name *</p>
                <input className="first-name" />
              </div>
              <div className="last">
                <p>Last Name *</p>
                <input className="last-name" />
              </div>
            </div>
            <div className="company-name">
              <div className="company-name-contain">
                <p>Company Name</p>
                <input className="company-name--input" />
              </div>
            </div>
            <div className="address">
              <div className="street">
                <p>Address *</p>
                <input className="street--input" placeholder="Street Address" />
              </div>
              <div className="apartment">
                <input
                  className="apartment--input"
                  rows="10"
                  placeholder="Apartment Number"
                />
              </div>
            </div>
            <div className="town">
              <div className="city">
                <p>Town / City *</p>
                <input className="city--input" placeholder="Town /City" />
              </div>
              <div className="country">
                <p>Town / City *</p>
                <input
                  className="country--input"
                  placeholder="State / Country"
                />
              </div>
              <div className="postcode">
                <p>Town / City *</p>
                <input
                  className="postcode--input"
                  placeholder="Postcode /Zip"
                />
              </div>
            </div>
            <div className="checkout_contact">
              <div className="checkout_contact--mail">
                <p>Email Address *</p>
                <input
                  placeholder="example@mail.com"
                  className="checkout_contact--mail--input"
                />
              </div>
              <div className="checkout_contact--phone">
                <p>Phone *</p>
                <input className="checkout_contact--phone--input" />
              </div>
            </div>
            <p className="order-notes">Order Notes</p>
            <div className="notes">
              <textarea
                className="notes--textarea"
                placeholder="Notes about your order e.g. special notes for delivery"
              />
            </div>
            <div className="place-order">
              <button className="place-order--btn btn btn-success">
              {/* opens popup showing success message, and balance remaining */}
              {/* we need new page called broughtproducts, user will be redirected to it after clicks place order*/}
                Place Order
              </button>
            </div>
          </div>
        </section>
      );
    } else {
      return <div />;
    }
  }
}

export default Checkout;
