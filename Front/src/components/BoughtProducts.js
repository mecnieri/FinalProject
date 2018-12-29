import BoughtWrapper from "./BoughtWrapper";
import Pagination from "react-js-pagination";
import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css";

export default class BoughtProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: true,
      products: null,
      activePage: 1,
      adminLog: false,
      registered: false
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    let FETCHURL;
    if (this.props.id) {
      FETCHURL = `http://localhost:5000/api/users/getById/${this.props.id}`;
    } else {
      FETCHURL = "http://localhost:5000/api/users/current";
    }

    fetch(FETCHURL, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Authorized")
      })
    })
      .then(res => res.json())
      .then(user => {
        let arrOfIds = user.boughtProducts.map(product => {
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
            let newProducts = products.map(prod => {
              let elem = user.boughtProducts.find(element => {
                return element.product_id === prod._id;
              });
              prod.quantity = Number(elem.quantity);
              return prod;
            });
            this.setState({ products: newProducts });
          });
      })
      .catch(err => console.log(err));
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }
  render() {
    if (this.state.products) {
      return (
        <div>
          <h1 style={{ textAlign: "center", margin: "10px" }}>
            Bought Products
          </h1>
          <BoughtWrapper
            products={this.state.products}
            number={this.state.activePage}
          />
          <div className="page-turner">
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={10}
              totalItemsCount={450}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
            />
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}
