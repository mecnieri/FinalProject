const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  products: {
    //or type productschema
    type: [Number],
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
