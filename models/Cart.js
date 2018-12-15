const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

//Create Schema
const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  products: {
    //or type productschema
    type: [ProductSchema],
    required: true
  },
  // expreience: [
  //   {
  //     title: {
  //       type: String,
  //       required: true
  //     },
  //     company: {
  //       type: String,
  //       required: true
  //     }
  //   }
  // ]
});

module.exports = Cart = mongoose.model("carts", CartSchema);
