const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const passport = require('passport');

const Cart  = require('../../models/Cart');

const User = require('../../models/User');
const Product = require("../../models/Product");

router.get("/test", (req, res) => res.json({ msg: "works" }));

//@route Post api/products/
//@desc add product to database
//@access Private by admin 
router.post("/", passport.authenticate('admin-rule', {session: false}), (req, res) => {
  const newProduct = new Product({
    productName: req.body.productName,
    price: req.body.price
  });
  newProduct.save().then(product => res.json(product));
});

//@route Delete api/products/
//@desc delete product to database
//@access Private by admin 
router.delete("/", passport.authenticate('admin-rule', {session: false}), (req, res) => {
  Product.findOneAndDelete({"_id" : ObjectId(req.body.Oid)}).then(product => res.json(product));
});

//@route  PUT api/products/
//@desc update product to database
//@access Private by admin 
router.put("/", passport.authenticate('admin-rule', {session: false}), (req, res) => {
  Product.findOneAndUpdate({"_id" : ObjectId(req.body.Oid)}, {productName: req.body.newName}).then(product => res.json(product))
  // newProduct.save().then(product => res.json(product));
});





//@route GET api/products/
//@desc get all the products
//@access Private by admin (to be done)
router.get("/", (req, res) => {
  // get all the users
  Product.find({}, function(err, products) {
    if (err) throw err;

    // object of all the users
    res.json(products);
  });
});

module.exports = router;
