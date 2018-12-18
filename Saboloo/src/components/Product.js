import React from 'react'
function Product(props){
    return(
        <div><h1>{props.product.productName}</h1>
        <img src={`${props.product.image}`} />
        </div>
    )
}
export default Product