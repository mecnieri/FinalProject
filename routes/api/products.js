const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectID;
const passport = require("passport");

const Product = require("../../models/Product");

// ROUTES FOR PRODUCTS CRUD 
//   .. 12 post .. 35 get .. 45 put .. 76 delete .. 


//@route Post api/products/
//@desc add product to database
//@access Admin
router.post("/", passport.authenticate("admin-rule", { session: false }), (req, res) => {
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
});

//@route GET api/products/
//@desc get all the products
//@access public
router.get("/", (req, res) => {
  Product.find({}, function (err, products) {
    if (err) throw err;
    res.json(products);
  });
});

//@route  PUT api/products/
//@desc update product in database
//@access Admin
router.put("/", passport.authenticate("admin-rule", { session: false }), (req, res) => {
  Product.findById(req.body.Oid).then((product) => {
    if (req.body.category) {
      product.category = req.body.category;
    }
    if (req.body.price) {
      product.price = req.body.price;
    }
    if (req.body.brand) {
      product.brand = req.body.brand;
    }
    if (req.body.model) {
      product.model = req.body.model;
    }
    if (req.body.image) {
      product.image = req.body.image;
    }
    if (req.body.weight) {
      product.specs.weight = req.body.weight;
    }
    if (req.body.size) {
      product.specs.size = req.body.size;
    }
    product.save();
    res.json(product);
  });
});

//@route Delete api/products/
//@desc delete product in database
//@access Admin
router.delete("/", passport.authenticate("admin-rule", { session: false }), (req, res) => {
  Product.findOneAndDelete({ _id: ObjectId(req.body.Oid) }).then(product =>
    res.json(product)
  );
});



// ROUTES FOR PRODUCTS SEARCH     .. 88 get :name .. 103 get :id .. 114 post getArray 

//@route GET api/products/:name
//@desc get product by brand, model, category or id
//@access public
router.get("/:name", (req, res) => {
  Product.find(
    { $or: [{ brand: req.params.name }, { model: req.params.name }, { category: req.params.name }, { _id: req.params.id }] },
    function (err, products) {
      if (err) throw err;
      // object of all the products 
      res.json(products);
    }
  );
});


//@route GET api/products/:id
//@desc get product by id 
//@access public
router.get("/product/:id", (req, res) => {
  Product.findById(req.params.id, function (err, product) {
    if (err) throw err;
    res.json(product);
  });
});


//@route post api/products/:getArray
//@desc get product by id
//@access public
router.post("/getArray", (req, res) => {
  Product.find({ '_id': { $in: req.body } }, function (err, products) {
    if (err) throw err;
    res.json(products);
  });
});

module.exports = router;