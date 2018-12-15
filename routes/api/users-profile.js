const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')
const passport = require('passport'); router.get('/test', (req, res) => res.json({ msg: "works" }));
const User = require('../../models/User');


router.post('/message', passport.authenticate('user-rule', { session: false }), (req, res) => {
    //Find user by id
    User.findById(req.user.id).then(user => {
        user.inbox.push({
            sender: user.username,
            letter: req.body.letter
        })
        user.save()
        res.json(user);
    });
});




module.exports = router;