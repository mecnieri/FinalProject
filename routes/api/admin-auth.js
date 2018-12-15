const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')
const passport = require('passport');

//Load Input Validation
const validateLoginInput = require('../../validation/login')


//Load User model
const Admin = require("../../models/Admin");


//@route Post api/users-auth/login
//@desc login user / return jwt toek
//@access Public
router.post("/login", (req, res) => {
  console.log('enters');
  const {errors, isValid} = validateLoginInput(req.body);
  //Check validation
  if(!isValid) {
    return res.status(400).json(errors)
  }
  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  Admin.findOne({ email: email }).then(admin => {
    //Check for admin via email
    if (!admin) {
      errors.email = 'User not found'
      return res.status(404).json(errors);
    }
    //Check Password
    bcrypt.compare(password, admin.password).then(isMatch => {
      if (isMatch) {
        //token generated here in future
        //user matched
        //komment may have to add other fields
        const payload = { id: admin.id, name: admin.username} //create jwt payload
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
