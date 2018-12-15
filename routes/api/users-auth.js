const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')
const passport = require('passport');

//Load Input Validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

const Cart = require("../../models/Cart")
//Load User model
const User = require("../../models/User");

//@route Get api/users/test //komm - copy and pase this on top of routes
//@desc Tests users route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "works" }));

//@route Post api/users-auth/register
//@desc Register user
//@access Public
router.post("/register", (req, res) => {
  const {errors, isValid} = validateRegisterInput(req.body);
  //Check validation
  if(!isValid) {
    return res.status(400).json(errors)
  }
  //Check if there already is an user with existing email
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists'
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        birthday: req.body.birthday,
        // write a function to repalce req.body.age
        age: req.body.age,
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
      const newCart = new Cart({
        user: newUser._id, products: [12,13,14]})
      newCart.save();
    }
  });
});

//@route Post api/users-auth/login
//@desc login user / return jwt toek
//@access Public
router.post("/login", (req, res) => {
  const {errors, isValid} = validateLoginInput(req.body);
  //Check validation
  if(!isValid) {
    return res.status(400).json(errors)
  }
  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email: email }).then(user => {
    //Check for user via email
    if (!user) {
      errors.email = 'User not found'
      return res.status(404).json(errors);
    }
    //Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //token generated here in future
        //user matched
        //komment may have to add other fields
        const payload = { id: user.id, name: user.username} //create jwt payload
        //Sign token
        jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600000},
          (err, token)=>{
            res.json({
              success: true,
              token: 'Bearer ' + token
            })
          });
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

//@route Get api/users-auth/current
//@desc return current user
//@access private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res)=>{
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
  });
})

module.exports = router;
