const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: false
  },
  birthday: {
    type: Date,
    required: true
  },
  balance: {
    type: Number,
    required: true
  },
  inbox: {
    type: Array
  },
  cart: [{ _id: false, product_id: String, quantity: String, }],
  
  boughtProducts: [{ product_id: String, quantity: String }]
});

module.exports = User = mongoose.model("users", UserSchema);
