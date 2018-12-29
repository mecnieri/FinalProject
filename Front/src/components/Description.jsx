import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css";
import Tabs from "./Tabs";

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
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
   
  }
  componentDidMount() {
    let query;
    this.props.location.myCustomProps ? (query = this.props.location.myCustomProps ) : (query = localStorage.getItem("prodId"));
    fetch(
      `http://localhost:5000/api/products/product/${
        query
      }`,
      {
        method: "GET"
      }
    )
      .then(res => res.json())
      .then(product => {
        this.setState({ product });
        localStorage.setItem("prodId", product._id);
      })
  }

  render() {
    if (this.state.product) {
      return (
        <section className="item">
          <div className="container">
            <div className="image-and-description">
              <img src={this.state.product.image} height="300" width="300" alt="product" />
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
                <div className="quantity-add">
                  <input type="number" defaultValue="1" id="quant" className="quantity-choose" />
                  <button
                    className="btn btn-primary btn-cart"
                    onClick={this.addHandler}
                  >
                    Add To Cart
                </button>
                </div>
                {/* </div> */}
              </div>
            </div>
            <Tabs>
              <div label="Description">
                <p className="prod-description">
                  {this.state.product.description}
                </p>
              </div>
              <div label="Additional information">
                <table className="table table-hover table-description">
                  <tbody>
                    <tr>
                      <td>Display Panel</td>
                      <td>Yes</td>
                    </tr>
                    <tr>
                      <td>Brand</td>
                      <td>{this.state.product.brand}</td>
                    </tr>
                    <tr>
                      <td>Model</td>
                      <td>{this.state.product.model}</td>
                    </tr>
                    <tr>
                      <td>Weight</td>
                      <td>{this.state.product.specs.weight}</td>
                    </tr>
                    <tr>
                      <td>Size</td>
                      <td>{this.state.product.specs.size}cm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div label="Instructions">
                <p className="instructions">
                  Cell phones are now practically as common as wristwatches. Perhaps for good reason, too: The newer models of cell phones (called "smart phones" as of 2009) allow users to check e-mail, surf the Internet and even use computer programs such as Microsoft Word or Microsoft Excel. If you are new to cell phone usage, you do not need all the "bells and whistles." At its core, a cell phone is simply a phone.

    credit: Creatas Images/Creatas/Getty Images
    Examine Your Phone
    Cell phones vary in size, style and function from one manufacturer to another. Despite the differences in appearance, once you become familiar with one phone, you will be able to use practically any other cell phone. The first step, therefore, is to examine your phone. If you have your user manual, open it up and read the sections on "getting started" or "your phone."
              </p>
              </div>
            </Tabs>
          </div>
        </section>
      );
    } else {
      return <div />;
    }
  }
}

export default Description;
