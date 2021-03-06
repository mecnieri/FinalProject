import React from 'react';

function AdminSearchProduct(props) {
    return (
        <div className="admin-image-container">
            <h1>{props.product.brand}</h1>
            <h2>{props.product.model}</h2>
            <img src={props.product.image} alt={props.product.productName} width="300px" height="300px" />
            <h3>{props.product.price} $</h3>
            <button className="btn btn-secondary btn-lg">Details</button>
            <hr />
        </div>
    )
}
export default AdminSearchProduct