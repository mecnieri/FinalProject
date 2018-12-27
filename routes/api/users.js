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

//@route Post api/users/register
//@desc Register user
//@access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  console.log(req.body);
  console.log(isValid);
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
        // write a function to repalce req.body.age

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
      console.log(newUser._id);
      // const newCart = new Cart({
      //   user: newUser._id, products: [12,13,14]})
      // newCart.save();
    }
  });
});

//@route Post api/users/login
//@desc login user / return jwt token
//@access Public
router.post("/login", (req, res) => {
  console.log(63, "login why?", req.body);
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
        //token generated here in future
        //user matched
        //komment may have to add other fields
        const payload = { id: user.id, name: user.username }; //create jwt payload
        //Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600000 },
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

//@route Put api/users
//@desc edit user found by id
//@access Admin
router.put('/', passport.authenticate('admin-rule', { session: false }), (req, res) => {
  User.findById(req.body.id).then(user => {
    if (req.body.username) {
      user.username = req.body.username
    }
    if (req.body.birthday) {
      user.birthday = req.body.birthday
    }
    if (req.body.email) {
      user.email = req.body.email
    }
    if (req.body.balance) {
      user.balance = req.body.balance
    }
    if (req.body.password) {
      user.password = req.body.password
    }


    //add other else conditions for user's other details
    user.save()
    res.json(user);
  })
})

// ------------------CART

//@route POST api/users/cart
//@desc add products to cart.
//@access user
router.post(
  "/cart",
  passport.authenticate("user-rule", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      if (
        !user.cart.find(element => {
          return (
            element.product_id === req.body.productId &&
            element.quantity === req.body.quantity
          );
        })
      ) {
        //remove if from cart in cart
        //check line below.
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

//@route Put api/users/cart
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
//@desc put product in the cart
//@access User
router.delete(
  "/cart",
  passport.authenticate("user-rule", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      console.log(205, "req body", req.body);
      user.cart = user.cart.filter(
        prod => prod.product_id !== req.body.productId
      );
      user.save();
      res.json(user.cart);
    });
  }
);

//@route GET api/users/cart
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

//@route GET api/users/boughtProducts
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

//@route GET api/users/message
//@desc message
//@access User
router.post('/message', passport.authenticate('user-rule', { session: false }), (req, res) => {
  //Find user by id
  console.log("aq shemodis turne")
  User.findById(req.user.id).then(user => {
    user.inbox = req.body.inbox
    // // ----
    // Admin.findOne({ email: "admin@gmail.com" }).then(admin => {
    //   console.log(admin.notifications)
    //   let index = admin.notifications.findIndex((mess) => mess.from === user.username)
    //   if (index > -1) {
    //     admin.notifications.splice(index, 1, {
    //       from: user.username,
    //       seen: false
    //     })
    //   } else {
    //     admin.notifications.push({
    //       from: user.username,
    //       seen: false
    //     })
    //   }

    //   console.log(admin.notifications)
    //   // res.json(user.inbox);
    //   admin.save()
    //   res.json(admin)
    // })
    console.log(258, "back", user.inbox);
    user.save()
  });
});

//@route POST api/users/checkout
//@desc checkout logic
//@access User
router.post(
  "/checkout",
  passport.authenticate("user-rule", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      let arrOfIds = user.cart.map(product => {
        return product.product_id;
      });
      axios({
        url: "http://localhost:5000/api/products/getArray",
        method: "post",
        data: JSON.stringify(arrOfIds),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          let total = 0;
          user.cart.map(productFromCart => {
            console.log(311, productFromCart);
            let found = response.data.find(function(productFromProducts) {
              console.log(313, productFromCart, productFromProducts);
              return productFromCart.product_id === productFromProducts._id;
            });
            if(found) {
              total += found.price * Number(productFromCart.quantity);
            }
          });

          let newArr = [];
          user.cart.forEach(item => {
            let foundItem = user.boughtProducts.find(prod => {
              return prod.product_id == item.product_id;
            });
            if (foundItem) {
              foundItem.quantity =
                Number(foundItem.quantity) + Number(item.quantity);
            } else {
              newArr.push(item);
            }
          });

          let joinArr = [...user.boughtProducts, ...newArr];
          newArr = [];
          user.boughtProducts = [];
          user.boughtProducts = joinArr.slice();
          user.cart = [];
          let tempBalance = user.balance;
          tempBalance -= total;
          total = 0;
          let stringBalance = String(tempBalance);
          user.balance = stringBalance;
          if (user.balance < 0) {
            return res.json({ error: "outta money" });
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

module.exports = router;
