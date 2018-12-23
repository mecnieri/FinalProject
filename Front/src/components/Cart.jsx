import React, { Component } from "react";
import List from "./List";
import _ from "../../node_modules/underscore/underscore";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css";
export default class Cart extends Component {
  constructor(props) {
    super(props);
    console.log("14", props.cart);
    this.state = {
      items: null,
      qtyTotal: 0,
      priceTotal: 0,
      subTotal: 0,
      shipping: 0,
      tax: 0.1,
      grandTotal: 0
    };
  }
  componentDidMount() {
    fetch("http://localhost:5000/api/users/getcart", {
      method: "post",
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
            this.setState({ items: products });
            this.handleSubTotal();
          });
      })
      .catch(err => console.log(err));
  }
  changeQty = (itemId, qty) => {
    let item = _.find(this.props.cart, item => item._id === itemId);
    item.quantity = 1;
    item.quantity = qty;
    this.setState({ qtyTotal: this.state.qtyTotal + item.quantity });
    this.setState({ priceTotal: this.state.priceTotal + item.price });
    this.handleSubTotal();
  };
  removeItem = itemId => {
    let items = _.without(
      this.state.items,
      _.findWhere(this.state.items, {
        id: itemId
      })
    );
    this.setState({ items: items });
    this.handleSubTotal();
  };
  handleSubTotal = (itemTotal = 0) => {
    _.each(this.state.items, function(item) {
      itemTotal += item.price;
    });
    this.setState({ subTotal: itemTotal });
    this.handleGrandTotal(itemTotal);
  };
  handleGrandTotal = subTotal => {
    this.setState({ grandTotal: this.state.tax * subTotal + subTotal });
  };
  render() {
      if (this.state.items) {
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
                      <th>{this.state.items[0].price}</th>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Shipping</th>
                      <th>Total</th>
                      <th> </th>
                    </tr>
                  </thead>
                  <List
                    items={this.props.cart}
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
                        <button className="btn btn-default">
                          Continue Shopping
                        </button>
                      </td>
                      <td>
                        <button
                          disabled={!this.state.grandTotal > 0}
                          className="btn btn-success"
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