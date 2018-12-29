import React, { Component } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';
import BoughtProduct from "./BoughtProduct";


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
