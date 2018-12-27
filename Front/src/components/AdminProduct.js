import React from 'react'
function Product(props) {
    return (
        <div className="admin-image-container">
            <h1>{props.product.brand}</h1>
            <h2>{props.product.model}</h2>
            <img src={props.product.image} alt={props.product.productName} width="300px" height="300px" />
            {/* <img src={`${props.product.image}`} /> */}
            <h3>{props.product.price} $</h3>


            {/* აქ მარის როუტერ ლინკი მჭირდება. რომ დააჭერს ჩამონათვალში პროდუქტს, უნდა გადაიყვანოს /item გვერდზე 
                        და ასქროლოს კიდეც*/}
            {/* <LinkFromScroll activeClass="active" to="description"
                smooth={true}
                duration={500}
            > */}
            <button className="btn btn-secondary btn-lg admin-btn-details">Details</button>
            {/* </LinkFromScroll> */}

            <hr />
        </div>
    )
}
export default Product;

