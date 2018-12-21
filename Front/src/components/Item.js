import React, { Component } from 'react';

export default class Item extends Component {
   constructor(props) {
       super(props);

       this.state = {
           itemTotal: (this.props.quantity * this.props.price) + this.props.shipping,
           product: null
       };
       console.log(20, this.props.product_id);
   }


   getInitialState() {
       this.setState({ itemTotal: this.props.quantity * this.props.price });
   }

   componentDidMount() {       
           fetch(`http://localhost:5000/api/products/product/${this.props.product_id}`, {
             method: 'get',
           })
             .then(res => res.json())
             .then(product => {
                this.setState({product})
             })
             .catch(err => console.log(err))
       
       console.log(33, this.state.product);

}

componentWillUnmount() {
       this.props.handleSubTotal();
   }

   handleChange = (itemId, e) => {
       this.setState({ itemTotal: e.target.value * this.props.price });
       this.props.changeQty(itemId, e.target.value);
   }

   render() {
       if(this.state.product) {
        return (
            <tr>
                <td>
                    <div className="media">
                        <p className="thumbnail pull-left">
                            <img src={this.state.product.image} alt="item" width="80" height="80" />
                        </p>
                        <div className="media-body">
                            <h5 className="media-heading"><p>{this.state.product.model}</p></h5>
                            <h5 className="media-heading"> by <p>{this.state.product.brand}</p></h5>
                        </div>
                    </div>
                </td>
                <td>
                    <input type="number" className="form-control" min="1" max={this.props.limit} value={this.props.quantity} onChange={this.handleChange.bind(this, this.props.id)} />
                </td>
                <td>
                    <strong className="itemPrice">${this.state.product.price.toFixed(2)}</strong>
                </td>
                <td>
                    {/* <strong className="shipping">${this.state.shipping.toFixed(2)}</strong> */}
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
       } else {
           return <tr></tr>
       }
      
   }
}