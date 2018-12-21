// import React, { Component } from 'react';
// import Item from './Item';
// import _ from '../../node_modules/underscore/underscore';

// export default class List extends Component {


//     render() {
//         const arrOfIds = [];
//         for (let a in this.props.items) {
//             arrOfIds.push(this.props.items[a].product_id)
//         }
//         console.log(arrOfIds)
//         let prodArr = [];
//         arrOfIds.forEach((id) => {
//             fetch(`http://localhost:5000/api/products/product/${id}`)
//                 .then(res => res.json())
//                 .then(product => {
//                     prodArr.push(product)
//                 })
//                 .catch(err => console.log(err));
//         })
//         return (
//             <div>
//                 {prodArr.map((prod)=>{
//                     <div>
//                         <h1>prod.price</h1>
//                     </div>
//                 })}
//             </div>
//         );
//     }
// }


