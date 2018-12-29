import React, { Component } from "react";
import AdminSearchProduct from "./AdminSearchProduct";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css";
import { Link } from "react-router-dom";

export default class AdminProducts extends Component {
  render() {
    if (this.props.adminProducts) {
      return (
        <div>
          <div>
            <div className="table admin-list-table">
              <div className="admin-first-row">
                {this.props.adminProducts
                  .slice(
                    (this.props.number - 1) * 12,
                    (this.props.number - 1) * 12 + 4
                  )
                  .map(product => (
                    <div key={product._id} className="admin-each-product one">
                      <Link
                        to={{
                          pathname: "/itemAdmin",
                          myCustomProps: product._id
                        }}
                      >
                        <AdminSearchProduct product={product} />
                      </Link>
                    </div>
                  ))}
              </div>

              <div className="admin-second-row">
                {this.props.adminProducts
                  .slice(
                    (this.props.number - 1) * 12 + 4,
                    (this.props.number - 1) * 12 + 8
                  )
                  .map(product => (
                    <div key={product._id} className="admin-each-product two">
                      <Link
                        to={{
                          pathname: "/itemAdmin",
                          myCustomProps: product._id
                        }}
                      >
                        {" "}
                        <AdminSearchProduct product={product} />
                      </Link>
                    </div>
                  ))}
              </div>
              <div className="admin-third-row">
                {this.props.adminProducts
                  .slice(
                    (this.props.number - 1) * 12 + 8,
                    (this.props.number - 1) * 12 + 12
                  )
                  .map(product => (
                    <div key={product._id} className="admin-each-product">
                      <Link
                        to={{
                          pathname: "/itemAdmin",
                          myCustomProps: product._id
                        }}
                      >
                        <AdminSearchProduct product={product} />
                      </Link>
                    </div>
                  ))}
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
