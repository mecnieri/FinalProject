const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Cart = require('../../models/Cart');

const User = require('../../models/User');

//Load Cart Model
// const Cart  = require('../../models/Cart');
//Load User Profile
// const User = require('../../models/User');





//@route POST api/cart
//@desc Create Cart (add items to users cart)
//@access private komment
router.post('/', passport.authenticate('admin-rule', { session: false }), (req, res) => {
  res.json({ awd: "dwaa" })
  //find product by id, find cart by, user, add product in cart. cart by user, if there is no such then create it, after that make crud operationd
  // new Cart({user: req.user.id, products: [12,13,14]}).save().then(cart => res.json(cart))
});


router.post('/message', passport.authenticate('admin-rule', { session: false }), (req, res) => {
  // Find user by id
  User.findOne({ username: req.body.username }).then(user => {
    user.inbox.push({
      sender: "admin",
      letter: req.body.letter
    })
    user.save()
    res.json(user);

  });


});


module.exports = router;