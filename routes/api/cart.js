const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const ObjectId = require('mongodb').ObjectID;

//Load Cart Model
const Cart  = require('../../models/Cart');
//Load User Profile
const User = require('../../models/User');

const Product = require('../../models/Product')



router.get('/test', (req, res)=>res.json({msg: "works"}));

//@route GET api/cart
//@desc get users cart
//@access private
router.get('/', passport.authenticate('user-rule', {session: false}), (req, res)=>{
  const errors = {};
  Cart.findOne({user: req.user.id})
  .then(cart =>{
    if(!cart) {
      errors.nocart = 'There is no cart for this user'
      return res.status(404).json(errors);
    }
    res.json(cart)
  })
  .catch(err => res.status(404).json(err))
});

//@route POST api/cart
//@desc Create Cart (add items to users cart)
//@access private komment
router.post('/', passport.authenticate('user-rule', {session: false}), (req, res)=>{
  //find product by id, find cart by, user, add product in cart. cart by user, if there is no such then create it, after that make crud operationd
  const product = Product.findById(req.body.id, function(err, product){
    console.log(product);
  });
  //add product to cart below.
  Cart.findOneAndUpdate({user: req.user.id}, {products: [34,23]}).then(cart => res.json(cart))
});


module.exports = router;