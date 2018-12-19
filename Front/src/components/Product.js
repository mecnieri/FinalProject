import React from 'react'
function Product(props){
    return(
        <div><h1>{props.product.brand}</h1>
        {/* <img src={props.product.image} alt={props.product.productName} width="300px" height="300px" /> */}
        {/* <img src={`${props.product.image}`} /> */}
        </div>
    )
}
export default Product