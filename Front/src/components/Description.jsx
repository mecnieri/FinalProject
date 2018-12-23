import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css";
import Tabs from "./Tabs";

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
      //   quantity: 1
    };
    this.addHandler = this.addHandler.bind(this);
  }
  addHandler() {
      let quantity = document.getElementById("quant").value;
      let productId = this.state.product._id;
    fetch('http://localhost:5000/api/users/cart', {
        method:"POST",
        headers: new Headers({
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': localStorage.getItem("Authorized")
          }),
        body: JSON.stringify({ quantity, productId })
    })
    .then( res => res.json() )
    .then(()=>{this.props.handleStateChange()})
    // let data = {
    //   quantity: document.getElementById("quant").value,
    //   productId: this.state.product._id
    // };
    // console.log(data);
    // const url = "http://localhost:5000/api/users/cart";
    // let fetchData = {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   headers: new Headers({
    //     Authorization: localStorage.getItem("Authorized")
    //   })
    // };

    // fetch(url, fetchData).then(function() {
    //   // Handle response you get from the server
    // });
    // fetch("http://localhost:5000/api/users/cart", {
    //     method: 'POST',
    //     body: {
    //         productId: id,
    //         quantity: quantity
    //     },
    //     headers: new Headers({
    //       'Authorization': localStorage.getItem("Authorized")
    //     })
    //   })
    //     .then(res => res.json())
    //     .then(test => console.log(test))
    //     .catch(err => console.log(err))
  }
  componentDidMount() {
    console.log("mounted");
    fetch(
      `http://localhost:5000/api/products/product/${
        this.props.location.myCustomProps
      }`,
      {
        method: "get"
      }
    )
      .then(res => res.json())
      .then(product => {
        this.setState({ product });
        //   console.log(22, this.state.product)
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(10, this.props.location.myCustomProps);
    if ((30, this.state.product)) {
      return (
        <section className="item">
          <div className="container">
            <div className="image-and-description">
              <img src={this.state.product.image} height="300" width="300" />
              <div className="description">
                <div className="description--title">
                  <p className="item-title"> {this.state.product.brand}</p>
                </div>
                <div className="description--details">
                  <p>{this.state.product.model}</p>
                </div>
                <div className="description--item-price">
                  <p className="price"> {this.state.product.price}$</p>
                </div>
                {/* <div className="description--cart"> */}
                <p>quantity</p>
                <input type="number" defaultValue="1" id="quant" />
                <button
                  className="btn btn-success btn-cart"
                  onClick={this.addHandler}
                >
                  Add To Cart
                </button>
                {/* </div> */}
              </div>
            </div>
            <div label="Description">
              <p>
                {this.state.product.description}
                {console.log(this.state.product)}
              </p>
            </div>
          </div>
        </section>
      );
    } else {
      return <div />;
    }
  }
}

export default Description;
