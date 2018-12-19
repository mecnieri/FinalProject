const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const passport = require("passport");

const User = require("../../models/User");
const Product = require("../../models/Product");

//@route Post api/products/
//@desc add product to database
//@access Admin
router.post(
  "/",
  passport.authenticate("admin-rule", { session: false }),
  (req, res) => {
    const newProduct = new Product({
      category: req.body.category,
      price: req.body.price,
      brand: req.body.brand,
      model: req.body.model,
      price: Number(req.body.price),
      details: {
        weight: req.body.weight,
        size: req.body.size,
      },
      image: "https://source.unsplash.com/random/"
    });
    newProduct.save().then(product => res.json(product));
  }
);

//@route Delete api/products/
//@desc delete product to database
//@access Admin
router.delete(
  "/",
  passport.authenticate("admin-rule", { session: false }),
  (req, res) => {
    Product.findOneAndDelete({ _id: ObjectId(req.body.Oid) }).then(product =>
      res.json(product)
    );
  }
);

//@route  PUT api/products/
//@desc update product to database
//@access Admin
router.put(
  "/",
  passport.authenticate("admin-rule", { session: false }),
  (req, res) => {
    // console.log(req.body.Oid);
    // Product.findOneAndUpdate({"_id" : ObjectId(req.body.Oid)}, {productName: req.body.productName, productPrice: req.body.price, category: req.body.category, details: {battery: req.body.battery, size: req.body.size, brand: req.body.brand}}).then(product => res.json(product))

    Product.findById(req.body.Oid).then(product => {
      if (req.body.productName) {
        product.productName = req.body.productName;
      }
      if (req.body.battery) {
        product.details.battery = req.body.battery;
      }
      if (req.body.productPrice) {
        product.price = req.body.productPrice;
      } //add other else conditions for user's other details
      product.save();
      res.json(product);
    });
  }
);

//@route GET api/products/
//@desc get all the products
//@access public
router.get("/", (req, res) => {
  // get all the users
  Product.find({}, function (err, products) {
    if (err) throw err;
    res.json(products);
  });
});

//@route GET api/products/:name
//@desc get product by name or category
//@access public
router.get("/:name", (req, res) => {
  // get all the users
  console.log(req.params.name);
  Product.find(
    { $or: [{ brand: req.params.name }, { model: req.params.name }, { category: req.params.name }] },
    function (err, products) {
      if (err) throw err;
      // object of all the users
      res.json(products);
    }
  );
});

//@route GET api/products/:category
//@desc get product by category
//@access public
router.get("/category/:category", (req, res) => {
  // get all the users
  Product.find({ category: req.params.category }, function (err, products) {
    if (err) throw err;
    // object of all the users
    res.json(products);
  });
});

module.exports = router;
