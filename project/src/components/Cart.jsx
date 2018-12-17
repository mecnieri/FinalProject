import React from 'react';
import '../db/productData.json';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1
        }
    }
    IncrementItem = (e) => {
        e.preventDefault();
        this.setState({ quantity: this.state.quantity + 1 })
    }
    render() {
        return (
            <section className="cart-container" >
                <div className="content">
                    <div className="content--title">
                        <h2>Shopping Cart Summary</h2>
                    </div>
                    <div className="content--table">
                        <form action="" className="content--table--form">
                            <table className="table">
                                <thead >
                                    <tr>
                                        <th className="product_thumbnail">&nbsp;</th>
                                        <th className="product_name">Product</th>
                                        <th className="product_price">Price</th>
                                        <th className="product_quantiy">Quantity</th>
                                        <th className="prouct_total">Total</th>
                                        <th className="product_remove">&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.productData.map(row => (
                                            <tr>
                                                <td className="product_thumbnail">{row.image}</td>
                                                <td>{row.product}</td>
                                                <td>{row.price}</td>
                                                <td>{row.quantity}</td>
                                                <td>{row.total}</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div className="action">
                                <button className="update-cart">Update Cart</button>
                                <button className="proceed-checkout">Proceed To Checkout</button>
                                <div className="total">
                                    <p>Subtotal</p>
                                    <p>Shipping</p>
                                    <hr />
                                    <p>Total</p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        )
    }
}

export default Cart;