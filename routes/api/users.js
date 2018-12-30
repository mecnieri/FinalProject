const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const axios = require("axios");

//Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Load User model
const User = require("../../models/User");

// Routes for Users Login, Registration, and Crud [from 21 to 166]

//@route Post api/users/register
//@desc Register user
//@access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //Check if there already is an user with existing email
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        birthday: req.body.birthday,
        balance: req.body.balance
      });
      //encrypt password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route Post api/users/login
//@desc login user / return jwt token
//@access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email: email }).then(user => {
    //Check for user via email
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    //Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //user matched
        const payload = { id: user.id, name: user.username }; //create jwt payload
        //Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 86400000 }, //change to realistic time for production
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

//@route Get api/users/current
//@desc return user by token
//@access User
router.get(
  "/current",
  passport.authenticate("user-rule", { session: false }),
  (req, res) => {
    //use payload data from token
    User.findById(req.user.id).then(user => {
      res.json(user);
    });
  }
);

//@route Get api/users/:username
//@desc return user by username
//@access Admin
router.get(
  "/:username",
  passport.authenticate("admin-rule", { session: false }),
  (req, res) => {
    User.findOne({ username: req.params.username }).then(user => {
      res.json(user);
    });
  }
);
//@route Get api/users/getById/:id
//@desc return user by id
//@access Admin
router.get(
  "/getById/:id",
  passport.authenticate("admin-rule", { session: false }),
  (req, res) => {
    console.log(123, req.params);
    User.findById(req.params.id).then(user => {
      res.json(user);
    });
  }
);

//@route Put api/users
//@desc edit user found by id
//@access Admin
router.put(
  "/",
  passport.authenticate("admin-rule", { session: false }),
  (req, res) => {
    User.findById(req.body.id).then(user => {
      if (req.body.username) {
        user.username = req.body.username;
      }
      if (req.body.birthday) {
        user.birthday = req.body.birthday;
      }
      if (req.body.email) {
        user.email = req.body.email;
      }
      if (req.body.balance) {
        user.balance = req.body.balance;
      }
      if (req.body.password) {
        user.password = req.body.password;
      }
      user.save();
      res.json(user);
    });
  }
);

// Routes for Users Cart CRUD operations, BoughtProducts, Checkout,  [from 174 to 323]

//@route POST api/users/cart
//@desc add products to cart.
//@access User
router.post(
  "/cart",
  passport.authenticate("user-rule", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      //if user tries to add the same product with the same quantity do nothing
      if (
        !user.cart.find(element => {
          return (
            element.product_id === req.body.productId &&
            element.quantity === req.body.quantity
          );
        })
      ) {
        //if there is already a product in cart but different quantity, update quant
        user.cart = user.cart.filter(e => e.product_id !== req.body.productId);
        user.cart.push({
          product_id: req.body.productId,
          quantity: req.body.quantity
        });
      }
      user.save();
    });
  }
);

//@route PUT api/users/cart
//@desc update quantity in cart
//@access User
router.put(
  "/cart",
  passport.authenticate("user-rule", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      let item = user.cart.find(prod => prod.product_id === req.body.productId);
      item.quantity = req.body.quantity;
      user.save();
      res.json(user.cart);
    });
  }
);

//@route delete api/users/cart
//@desc delete product from the cart
//@access User
router.delete(
  "/cart",
  passport.authenticate("user-rule", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      user.cart = user.cart.filter(
        prod => prod.product_id !== req.body.productId
      );
      user.save();
      res.json(user.cart);
    });
  }
);


router.delete(
  "/",
  passport.authenticate("admin-rule", { session: false }),
  (req, res) => {
    console.log(237, req.body.id);
    User.findOneAndRemove({ _id: req.body.id}).then(user => {
      user.save()
    })
  }
);

//@route post api/users/getCart
//@desc get cart from users
//@access Admin
router.post(
  "/getCart",
  passport.authenticate("user-rule", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      res.json(user.cart);
    });
  }
);

//@route GET api/users/boughtProducts/:id
//@desc get products from users broughtProducts
//@access Admin
router.get(
  "/boughtProducts/:id",
  passport.authenticate("admin-rule", { session: false }),
  (req, res) => {
    User.findById(req.params.id).then(user => {
      res.json(user.boughtProducts);
    });
  }
);

//@route POST api/users/checkout
//@desc checkout logic - empty cart, update balance & bought products
//@access User
router.post(
  "/checkout",
  passport.authenticate("user-rule", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      //create array of product ids that are in cart
      let arrOfIds = user.cart.map(product => {
        return product.product_id;
      });
      //use array of product ids to get array of products objects
      axios({
        url: "http://localhost:5000/api/products/getArray",
        method: "post",
        data: JSON.stringify(arrOfIds),
        headers: {
          "Content-Type": "application/json"
        }
      })
        //accumulate total cost of products in cart
        .then(function(response) {
          let total = 0;
          let tax = 0.1;
          user.cart.forEach(productFromCart => {
            let found = response.data.find(
              productFromProducts =>
                productFromCart.product_id === productFromProducts._id
            );
            if (found) {
              total +=
                (found.price + found.price * tax) * productFromCart.quantity;
            }
          });

          let tempArr = [];
          //match product from cart to product in bought products.
          //if match is made just update quantity, if not push item in tempArr
          user.cart.forEach(item => {
            let foundItem = user.boughtProducts.find(prod => {
              return prod.product_id == item.product_id;
            });
            if (foundItem) {
              foundItem.quantity = foundItem.quantity + item.quantity;
            } else {
              tempArr.push(item);
            }
          });
          //update boughtproducts, balance, and empty cart
          user.boughtProducts = [...user.boughtProducts, ...tempArr];
          user.cart = [];
          user.balance -= total;
          if (user.balance < 0) {
            return res.json({ error: "Not enough Balance" });
          }
          user.save();
          return res.json(user);
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  }
);

// Routes for Users message [from 328 to 359]

//@route GET api/users/message
//@desc message
//@access User
router.post(
  "/message",
  passport.authenticate("user-rule", { session: false }),
  (req, res) => {
    //Find user by id
    User.findById(req.user.id).then(user => {
      user.inbox = req.body.inbox;
      Admin.findOne({ email: "admin@gmail.com" }).then(admin => {
        let index = admin.notifications.findIndex(
          mess => mess.from === user.username
        );
        if (index > -1) {
          admin.notifications.splice(index, 1, {
            from: user.username
          });
        } else {
          // save notifications for admin
          admin.notifications.push({
            from: user.username
          });
        }
        admin.save();
        res.json(admin);
      });
      user.save();
    });
  }
);
module.exports = router;
