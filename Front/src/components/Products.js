import React, { Component } from "react";
import Product from "./Product"
// import Details from './components/UserDetails'
// import Address from './components/UserAddress'
// import Company from './components/UserCompany'
// import "./styles/Users.css"

// const FETCHURL = "http://localhost:5000/api/products";

export default class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: null,
    };
  }
  componentDidMount() {
    fetch(FETCHURL)
      .then(res => res.json())
      .then(products => {
        this.setState({ products });
      })
      .catch(err => console.log(err));
    console.log("mounted");
  }
  render() {
    if (this.props.products) {
      console.log(26, this.props.products);
      return (
        //davarendero komponenti propsad gadavcem states
        <div>
          <table>
            <tbody>
              <tr>
                {this.state.products.slice((this.props.number - 1) * 12, (this.props.number - 1) * 12 + 3).map(product => (
                  <td key={product._id}>
                    <Product product={product} />
                  </td>
                ))}

              </tr>
              <tr>
                {this.state.products.slice((this.props.number - 1) * 12 + 4, (this.props.number - 1) * 12 + 7).map(product => (
                  <td key={product._id}>
                    <Product product={product} />
                  </td>
                ))}

              </tr>
              <tr>
                {this.state.products.slice((this.props.number - 1) * 12 + 8, (this.props.number - 1) * 12 + 11).map(product => (
                  <td key={product._id}>
                    <Product product={product} />
                  </td>
                ))}

              </tr>

            </tbody>
          </table>

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
