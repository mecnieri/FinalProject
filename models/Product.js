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
});

module.exports = Product = mongoose.model('products', ProductSchema)