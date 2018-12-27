import React from 'react'
function BoughtProduct(props) {
    return (
        <div className="image-container">
            <h1>{props.product.brand}</h1>
            <h2>{props.product.model}</h2>
            <img src={props.product.image} alt={props.product.productName} width="300px" height="300px" />
            <h3>quantity {props.product.quantity}</h3>
            <hr />
        </div>
    )
}
export default BoughtProduct