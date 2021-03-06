import React, { Component } from "react";

export default class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemTotal: this.props.quantity * this.props.price
    };
  }

  getInitialState() {
    this.setState({ itemTotal: this.props.quantity * this.props.price });
  }

  componentWillUnmount() {
    this.props.handleSubTotal();
  }

  handleChange = (itemId, e) => {
    this.setState({ itemTotal: e.target.value * this.props.price });
    this.props.changeQty(itemId, e.target.value);
    setTimeout(() => {
      fetch("http://localhost:5000/api/users/cart", {
        method: "PUT",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("Authorized")
        }),
        body: JSON.stringify({
          productId: this.props._id,
          quantity: String(this.props.quantity)
        })
      }).then(res => res.json());
    }, 100);
  };

  render() {
    return (
      <tr>
        <td>
          <div className="media">
            <a className="thumbnail pull-left" href="#">
              <img src={this.props.image} alt="item" width="200" height="200" />
            </a>
            <div className="media-body">
              <h5 className="media-heading">
                <a href="#">{this.props.model}</a>
              </h5>
              <p className="media-heading">
                by <a href="#">{this.props.brand}</a>
              </p>
            </div>
          </div>
        </td>
        <td>
          <input
            type="number"
            className="qt-input"
            min="1"
            value={this.props.quantity}
            onChange={this.handleChange.bind(this, this.props._id)}
          />
        </td>
        <td>
          <strong className="itemPrice">${this.props.price.toFixed(2)}</strong>
        </td>
        <td>
          <strong className="itemTotal">
            ${this.state.itemTotal.toFixed(2)}
          </strong>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.props.removeItem.bind(this, this.props._id)}
          >
            Remove
          </button>
        </td>
      </tr>
    );
  }
}
