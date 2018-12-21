import React, { Component } from "react";
import Product from "./Product"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';
// import Details from './components/UserDetails'
// import Address from './components/UserAddress'
// import Company from './components/UserCompany'
// import "./styles/Users.css"

// const FETCHURL = "http://localhost:5000/api/products";

export default class Products extends Component {
  // constructor(props) {
  //   super(props)
  //   // this.state = {
  //   //   products: null,
  //   // };
  // }
  // componentDidMount() {
  //   fetch(FETCHURL)
  //     .then(res => res.json())
  //     .then(products => {
  //       this.setState({ products });
  //     })
  //     .catch(err => console.log(err));
  //   console.log("mounted");
  // }
  render() {
    // this.props.number = 1; 
    if (this.props.products) {
      return (
        //davarendero komponenti propsad gadavcem states
        <div>
          <div className="table list-table">
            <div className="first-row">
              {this.props.products.slice((this.props.number - 1) * 12, (this.props.number - 1) * 12 + 4).map(product => (
                <div key={product._id} className="each-product one">
                  <Product product={product} />
                  <button className="btn btn-sucess">Add To Cart</button>
                </div>
              ))}

            </div>
            <div className="second-row">
              {this.props.products.slice((this.props.number - 1) * 12 + 4, (this.props.number - 1) * 12 + 8).map(product => (
                <div key={product._id} className="each-product two">
                  <Product product={product} />
                  <button className="btn btn-sucess">Add To Cart</button>
                </div>
              ))}

            </div>
            <div className="third-row">
              {this.props.products.slice((this.props.number - 1) * 12 + 8, (this.props.number - 1) * 12 + 12).map(product => (
                <div key={product._id} className="each-product">
                  <Product product={product} />
                  <button className="btn btn-sucess">Add To Cart</button>
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
// {users.map(user => (
//     <div className="info" style={{border:"2px solid seagreen", padding:"10px",margin:"10px", width:"400px"}}>
//         <Details details={user}/>
//         <Address address={user.address} />
//         <Company company={user.company}/>
//     </div>
// ))
// }
