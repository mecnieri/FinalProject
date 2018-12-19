const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ProductSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  specs: {
    weight: String,
    size: String,
  }
});

module.exports = Product = mongoose.model("products", ProductSchema);

// module.exports = {
//   Product: mongoose.model('products', ProductSchema),
//   ProductSchema: ProductSchema
// }
