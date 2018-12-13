const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')
const passport = require('passport');

//Load Input Validation
const validateLoginInput = require('../../validation/login')


//Load Admin model
const Admin = require("../../models/Admin");
//Only Admin data hardcoded on Database as requested
//Admin username: bestAdmin
//Admin email: admin@gmail.com
//Admin password: password123456


//@route Post api/admin-auth/login
//@desc login admin / return jwt token
//@access Public
router.post("/login", (req, res) => {
  const {errors, isValid} = validateLoginInput(req.body);
  //Check validation
  if(!isValid) {
    return res.status(400).json(errors)
  }
  const email = req.body.email;
  const password = req.body.password;

  //Find admin by email
  Admin.findOne({ email: email }).then(admin => {
    //Check for admin via email
    if (!admin) {
      errors.email = 'User not found'
      return res.status(404).json(errors);
    }
    //Check Password
    bcrypt.compare(password, admin.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: admin.id, name: admin.username} //create jwt payload
        //Sign token
        jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600},
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
router.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res)=>{
  console.log('hi');
})

module.exports = router;
