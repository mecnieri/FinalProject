import React, { Component } from "react";
import Product from "./Product"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';
import { BrowserRouter as Router, Route, Link, RouteHandler, Redirect } from "react-router-dom";
import Pagination from "../../node_modules/react-js-pagination";

// import Details from './components/UserDetails'
// import Address from './components/UserAddress'
// import Company from './components/UserCompany'
// import "./styles/Users.css"

// const FETCHURL = "http://localhost:5000/api/products";

export default class Products extends Component {

  render() {
    if (this.props.products) {
      return (
        //davarendero komponenti propsad gadavcem states
        <div>
          <div className="table list-table">
            <div className="first-row">
              {this.props.products.slice((this.props.number - 1) * 12, (this.props.number - 1) * 12 + 4).map(product => (
                <div key={product._id} className="each-product one">
                <Link to={{pathname: '/item', myCustomProps: product._id}}><Product product={product} /></Link>
                </div>
              ))}

            </div>
            <div className="second-row">
              {this.props.products.slice((this.props.number - 1) * 12 + 4, (this.props.number - 1) * 12 + 8).map(product => (
                <div key={product._id} className="each-product two">
                <Link to={{pathname: '/item', myCustomProps: product._id}}><Product product={product} /></Link>
                </div>
              ))}

            </div>
            <div className="third-row">
              {this.props.products.slice((this.props.number - 1) * 12 + 8, (this.props.number - 1) * 12 + 12).map(product => (
                <div key={product._id} className="each-product">
                <Link to={{pathname: '/item', myCustomProps: product._id}}><Product product={product} /></Link>
                </div>
              ))}

            </div>
            <div className="page-turner">
                  <Pagination
                    activePage={this.props.number}
                    itemsCountPerPage={10}
                    totalItemsCount={450}
                    pageRangeDisplayed={5}
                    onChange={this.props.handlePageChange}
                  />
                </div>
          </div>
        </div>
      );
    } else {
      return <div />
    }
  }
}
// {users.map(user => (
//     <div className="info" style={{border:"2px solid seagreen", padding:"10px",margin:"10px", width:"400px"}}>
//         <Details details={user}/>
//         <Address address={user.address} />
//         <Company company={user.company}/>
//     </div>
// ))
// }
