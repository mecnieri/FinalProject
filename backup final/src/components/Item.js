import React, { Component } from 'react';
import img80 from './../img-80.png';

export default class Item extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemTotal: (this.props.quantity * this.props.price) + this.props.shipping,
        };
    }

    getInitialState() {
        this.setState({ itemTotal: this.props.quantity * this.props.price });
    }

    componentWillUnmount() {
        this.props.handleSubTotal();
    }

    handleChange = (itemId, e) => {
        this.setState({ itemTotal: e.target.value * this.props.price });
        this.props.changeQty(itemId, e.target.value);
    }

    render() {
        return (
            <tr>
                <td>
                    <div className="media">
                        <a className="thumbnail pull-left" href="#">
                            <img src={img80} alt="item" />
                        </a>
                        <div className="media-body">
                            <h5 className="media-heading"><a href="#">{this.props.name}</a></h5>
                            <p className="media-heading"> by <a href="#">{this.props.brand}</a></p>
                        </div>
                    </div>
                </td>
                <td>
                    <input type="number" className="form-control" min="1" max={this.props.limit} value={this.props.quantity} onChange={this.handleChange.bind(this, this.props.id)} />
                </td>
                <td>
                    <strong className="itemPrice">${this.props.price.toFixed(2)}</strong>
                </td>
                <td>
                    <strong className="shipping">${this.props.shipping.toFixed(2)}</strong>
                </td>
                <td>
                    <strong className="itemTotal">${this.state.itemTotal.toFixed(2)}</strong>
                </td>
                <td>
                    <button type="button" className="btn btn-danger" onClick={this.props.removeItem.bind(this, this.props.id)}>
                        Remove
                    </button>
                </td>
            </tr>
        );
    }
}