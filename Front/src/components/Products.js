import React, { Component } from "react";
import Product from "./Product"
// import Details from './components/UserDetails'
// import Address from './components/UserAddress'
// import Company from './components/UserCompany'
// import "./styles/Users.css"

// const FETCHURL = "http://localhost:5000/api/products";

export default class Products extends Component {
  // state = {
  //   products: null,
  // };

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
    if (this.props.products) {
      console.log(26, this.props.products);
      return (
          //davarendero komponenti propsad gadavcem states
        <div>
          {this.props.products.slice(0, 10).map(product => (
            <Product product={product}/>
          ))}
        </div>
      );
    } else {
        return <div/>
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
