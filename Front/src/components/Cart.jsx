import React, { Component } from "react";
import List from "./List";
import _ from "../../node_modules/underscore/underscore";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css";
import { Link, Router, Route, Redirect } from "react-router-dom";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      qtyTotal: 0,
      priceTotal: 0,
      subTotal: 0,
      tax: 0.1,
      grandTotal: 0,
      user: null,
      error: null,
      redirect: false
    };
  }
  componentDidMount() {
    fetch("http://localhost:5000/api/users/getCart", {
      method: "POST",
      headers: new Headers({
        Authorization: localStorage.getItem("Authorized")
      })
    })
      .then(res => res.json())
      .then(cart => {
        let arrOfIds = cart.map(product => {
          return product.product_id;
        });

        fetch("http://localhost:5000/api/products/getArray", {
          method: "POST",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json"
          }),
          body: JSON.stringify(arrOfIds)
        })
          .then(res => res.json())
          .then(products => {
            let newProducts = products.map(prod => {
              let elem = cart.find(element => {
                return element.product_id == prod._id;
              });
              prod.quantity = Number(elem.quantity);
              return prod;
            });
            this.setState({ items: newProducts });
            this.handleSubTotal();
          });
      })
      .catch(err => console.log(err));
  }
  changeQty = (itemId, qty) => {
    let item = _.find(this.state.items, item => item._id === itemId);
    // item.quantity = 1;
    item.quantity = qty;
    this.setState({ qtyTotal: this.state.qtyTotal + item.quantity });
    this.setState({ priceTotal: this.state.priceTotal + item.price });
    this.handleSubTotal();
  };
  removeItem = itemId => {
    let items = _.without(
      this.state.items,
      _.findWhere(this.state.items, {
        _id: itemId
      }),
      fetch("http://localhost:5000/api/users/cart", {
        method: "DELETE",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("Authorized")
        }),
        body: JSON.stringify({ productId: itemId })
      }).then(res => res.json())
    );
    this.setState({ items: items });
    this.handleSubTotal();
  };
  handleSubTotal = (itemTotal = 0) => {
    _.each(this.state.items, function (item) {
      itemTotal += item.price * item.quantity;
    });
    this.setState({ subTotal: itemTotal });
    this.handleGrandTotal(itemTotal);
  };
  handleGrandTotal = subTotal => {
    this.setState({ grandTotal: this.state.tax * subTotal + subTotal });
  };
  handleCheckout = () => {
    fetch("http://localhost:5000/api/users/checkout", {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Authorized")
      })
    })
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          return this.setState({ error: result.error, redirect: true });
        } else {
          return this.setState({ user: result, redirect: true });
        }
      });
  };
  render() {
    if (this.state.redirect) {
      let message, purchaseStatus;
      if (this.state.error) {
        message = this.state.error;
        purchaseStatus = false;
      } else {
        message = "wooo ho, purchase successful";
        purchaseStatus = true;
      }
      return (
        <Redirect
          to={{
            pathname: "/successdata",
            state: { message, purchaseStatus }
          }}
        />
      );
    } else if (this.state.items) {
      const { grandTotal: total } = this.state;
      if (total === 0) {
        return <h2 className="empty-cart">You have no Items in the Cart</h2>;
      }
      return (
        <div className="cart">
          <div className="container">
            <div className="card container">
              <div className="row">
                <table className="table table-hover ">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total </th>
                      <th> </th>
                    </tr>
                  </thead>
                  <List
                    items={this.state.items}
                    removeItem={this.removeItem}
                    changeQty={this.changeQty}
                    handleSubTotal={this.handleSubTotal}
                  />
                  <tfoot>
                    <tr>
                      <td>
                        <h5>Subtotal:</h5>
                      </td>
                      <td className="text-right">
                        <h5>
                          <strong>${this.state.subTotal.toFixed(2)}</strong>
                        </h5>
                      </td>
                    </tr>
                    <tr>
                      <td />
                      <td />
                      <td />
                      <td>
                        <h5>Tax</h5>
                      </td>
                      <td className="text-right">
                        <h5>
                          <strong>10%</strong>
                        </h5>
                      </td>
                    </tr>
                    <tr>
                      <td />
                      <td />
                      <td />
                      <td>
                        <h3>Total</h3>
                      </td>
                      <td className="text-right">
                        <h3>
                          <strong>${this.state.grandTotal.toFixed(2)}</strong>
                        </h3>
                      </td>
                    </tr>
                    <tr>
                      <td />
                      <td />
                      <td />
                      <td>
                        <Link to="/">
                          <button className="btn btn-primary">
                            Continue Shopping
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button
                          disabled={!this.state.grandTotal > 0}
                          className="btn btn-success"
                          onClick={this.handleCheckout}
                        >
                          Checkout
                        </button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}