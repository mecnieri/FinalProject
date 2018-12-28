const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')
const passport = require('passport');


//Load Input Validation
const validateLoginInput = require('../../validation/login')

//Load User model
const User = require("../../models/User");
//Load Admin model
const Admin = require("../../models/Admin");

router.put('/notifications', passport.authenticate('admin-rule', { session: false }), (req, res) => {
  let sender = req.body.sender
  console.log(76, sender);
  console.log(77, req.body);
  Admin.findOne({ email: "admin@gmail.com" }).then(admin => {
    admin.notifications = admin.notifications.filter(notif => notif.from !== sender);
    admin.save()
    res.json(admin.notifications)
  })
 });

router.get('/', passport.authenticate('admin-rule', { session: false }), (req, res) => {
  // Find user by id (update later)
  Admin.findOne({email: "admin@gmail.com"}).then(admin => {
    res.json(admin.notifications);
  });
});
//@route Post api/admin/login
//@desc login admin / return jwt token
//@access Public
router.post("/login", (req, res) => {
  console.log('enters');
  const { errors, isValid } = validateLoginInput(req.body);
  //Check validation
  if (!isValid) {
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
        //komment may have to add other fields
        const payload = { id: admin.id, name: admin.username } //create jwt payload
        //Sign token
        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600000 },
          (err, token) => {
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



//@route Post api/admin-auth/
//@desc return current user
//@access private
router.post('/message', passport.authenticate('admin-rule', { session: false }), (req, res) => {
  // Find user by id
  User.findOne({ username: req.body.username }).then(user => {
    user.inbox = req.body.inbox
    user.save()
    res.json(user);
  });
});
module.exports = router;
