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

router.post('/cart', passport.authenticate('user-rule', { session: false }), (req, res) => {
    //Find user by id
    User.findById(req.user.id).then(user => {
        if (req.body.productId && req.body.quantity) {
            let index = user.cart.findIndex((prod) => prod.product_id === req.body.productId)
            if (index > -1) {
                user.cart.splice(index, 1, {
                    product_id: req.body.productId,
                    quantity: req.body.quantity
                })
            } else {
                user.cart.push({
                    product_id: req.body.productId,
                    quantity: req.body.quantity
                })
            }
        }
        console.log(!req.body.quantity);
        if (req.body.productId && !req.body.quantity) {
            let index = user.cart.findIndex((prod) => prod.product_id === req.body.productId)
            if (index > -1) {
                let quantity = user.cart[index].quantity
                user.cart.splice(index, 1, {
                    product_id: req.body.productId,
                    quantity: ++quantity
                })
            } else {
                console.log(index);
                user.cart.push({
                    product_id: req.body.productId,
                    quantity: 1
                })
            }

        }
        if (req.body.delete) {

            let indexDelete = user.cart.findIndex((prod) => prod.product_id === req.body.delete)
            console.log(indexDelete, "indexDelete");
            user.cart.splice(indexDelete, 1)
        }
        user.save().then(user => res.json(user.cart)).catch(err => res.status(400).json({ msg: 'Error' }))
    });
});

module.exports = router;