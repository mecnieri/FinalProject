import React, { Component } from "react";
import AdminSearchProduct from "./AdminSearchProduct"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';
import { BrowserRouter as Router, Route, Link, RouteHandler, Redirect } from "react-router-dom";

export default class AdminProducts extends Component {
    render() {
        // console.log(9, "AdminProducts.js", this.props.adminProducts)
        console.log(10, "AdminProducts.js", this.props.number)

        if (this.props.adminProducts) {
            return (
                //davarendero komponenti propsad gadavcem states
                <div>
                    <div>
                        <div className="table list-table">
                            <div className="first-row">
                                {this.props.adminProducts.slice((this.props.number - 1) * 12, (this.props.number - 1) * 12 + 4).map(product =>
                                    (
                                        <div key={product._id} className="each-product one">
                                            <AdminSearchProduct product={product} />
                                        </div>
                                    ))}
                            </div>

                            <div className="second-row">
                                {this.props.adminProducts.slice((this.props.number - 1) * 12 + 4, (this.props.number - 1) * 12 + 8).map(product => (
                                    <div key={product._id} className="each-product two">
                                        <AdminSearchProduct product={product} />
                                    </div>
                                ))}

                            </div>
                            <div className="third-row">
                                {this.props.adminProducts.slice((this.props.number - 1) * 12 + 8, (this.props.number - 1) * 12 + 12).map(product => (
                                    <div key={product._id} className="each-product">
                                        <AdminSearchProduct product={product} />
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <div />
        }
    }
}