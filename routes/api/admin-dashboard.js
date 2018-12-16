const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../../models/User');

//Load User Profile
// const User = require('../../models/User');





//@access private komment
router.post('/', passport.authenticate('admin-rule', { session: false }), (req, res) => {
  res.json({ awd: "dwaa" })
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


