const express = require("express");
const router = express.Router();

const Product = require("../../models/Product");

router.get("/test", (req, res) => res.json({ msg: "works" }));

//@route Post api/products/
//@desc add product to database
//@access Private by admin (to be done)
router.post("/", (req, res) => {
  const newProduct = new Product({
    productName: req.body.productName,
    price: req.body.price
  });
  newProduct.save().then(product => res.json(product));
});

//@route Post api/products/
//@desc add product to database
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
