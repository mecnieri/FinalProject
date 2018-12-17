const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ProductSchema = new Schema({
  
  productName: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  details: {
    battery: String,
    size: String,
    brand: String
  }

});

module.exports = Product = mongoose.model('products', ProductSchema)

// module.exports = {
//   Product: mongoose.model('products', ProductSchema),
//   ProductSchema: ProductSchema
// }