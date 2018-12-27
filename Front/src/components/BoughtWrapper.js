import React, { Component } from "react";
import Product from "./Product"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';
import { BrowserRouter as Router, Route, Link, RouteHandler, Redirect } from "react-router-dom";
import BoughtProduct from "./BoughtProduct";
import BoughtProducts from "./BoughtProducts";


export default class BoughtWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null,
    };
  }
  render() {
    if (this.props.products) {
      return (
        //davarendero komponenti propsad gadavcem states
        <div>
          <div className="table list-table">
            <div className="first-row">
              {this.props.products.slice((this.props.number - 1) * 12, (this.props.number - 1) * 12 + 4).map(product => (
                <div key={product._id} className="each-product one">
                <BoughtProduct product={product} />
                </div>
              ))}

            </div>
            <div className="second-row">
              {this.props.products.slice((this.props.number - 1) * 12 + 4, (this.props.number - 1) * 12 + 8).map(product => (
                <div key={product._id} className="each-product two">
                <BoughtProduct product={product} />
                </div>
              ))}

            </div>
            <div className="third-row">
              {this.props.products.slice((this.props.number - 1) * 12 + 8, (this.props.number - 1) * 12 + 12).map(product => (
                <div key={product._id} className="each-product">
                <BoughtProduct product={product} />
                </div>
              ))}

            </div>
          </div>
        </div>
      );
    } else {
      return <div />
    }
  }
}
