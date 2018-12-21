import React from 'react'
function Product(props) {
    return (
        <div className="image-container">
            <h1>{props.product.brand}</h1>
            <h2>{props.product.model}</h2>
            <img src={props.product.image} alt={props.product.productName} width="300px" height="300px" />
            {/* <img src={`${props.product.image}`} /> */}
            <h3>{props.product.price} $</h3>
            <button className="btn btn-sucess">Add To Cart</button>

            <hr />
        </div>
    )
}
export default Product

