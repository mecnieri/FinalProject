import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css";
import Tabs from "./Tabs";

class AdminDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null
        };
    }
    handleEditProduct = (e) => {
        e.preventDefault()
        let FETCHURL = `http://localhost:5000/api/products`;
        let image = e.target.children[0].childNodes[1].value;
        let brand = e.target.children[1].childNodes[1].value;
        let model = e.target.children[2].childNodes[1].value;
        let price = e.target.children[4].childNodes[1].value;
        let category = e.target.children[3].childNodes[1].value
        let productId = this.state.product._id
        fetch(FETCHURL, {
            method: 'put',
            headers: new Headers({
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem("Authorized")
            }),
            body: JSON.stringify({
                // id: productId,
                category: category,
                image, brand, model, price,
                Oid: productId
            })
        })

    }

    handleDeleteProduct = (e) => {
        e.preventDefault()
        console.log(42, "state product", this.state.product)
        let productId = this.state.product._id
        let FETCHURL = `http://localhost:5000/api/products/`;
        fetch(FETCHURL, {
            method: 'delete',
            headers: new Headers({
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem("Authorized")
            }),
            body: JSON.stringify({
                Oid: productId
            })
        })
    }
    componentDidMount() {
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
            })
            .catch(err => console.log(err));
    }

    render() {
        if ((30, this.state.product)) {
            return (
                <section className="item">
                    <div className="container">
                        <div className="image-and-description">
                            <form onSubmit={this.handleEditProduct} className="edit-user">
                                <div className="product-image"><p>Image:</p>
                                    <input type="text" placeholder={this.state.product.image} className="form-control" /><br />
                                </div>
                                <div className="product-brand"><p>Brand:</p>
                                    <input type="text" placeholder={this.state.product.brand} className="form-control" /><br />
                                </div>
                                <div className="product-model"><p>Model:</p>
                                    <input type="text" placeholder={this.state.product.model} className="form-control" /><br />
                                </div>
                                <div className="product-category"><p>Category:</p>
                                    <input type="text" placeholder={this.state.product.category} className="form-control" /><br />
                                </div>
                                <div className="product-category"><p>Price:</p>
                                    <input type="text" placeholder={this.state.product.price} className="form-control" /><br />
                                </div>
                                <input type="submit" value="Save Changes" className=" btn btn-primary change-user-btn" />
                                <button onClick={this.handleDeleteProduct} value="X" className="btn btn-danger delete-user-btn">Delete Product</button>
                            </form>
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

export default AdminDescription;