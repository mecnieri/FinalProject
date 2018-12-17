const mongoose = require('mongoose');
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
    required: true
  },
  birthday: {
    type: String,
    required: true
  },
  balance: {
    type: String,
    required: true
  },
  inbox: {
    type: Array
  },
  cart: {
    type: Array
  },
  boughtProducts: {
    type: Array
  }
});

module.exports = User = mongoose.model('users', UserSchema)