const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

//Get access to endpoint files
const usersAuth = require('./routes/api/users');
const adminAuth = require('./routes/api/admin');
const products = require('./routes/api/products');
const checkout = require('./routes/api/checkout')

const cors = require('cors');

const app = express();
app.use( cors('*') )
app.use( express.json() )
app.use( express.urlencoded( { extended: true}) )

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI

//Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);


//Use Routes
app.use('/api/users', usersAuth);
app.use('/api/admin', adminAuth);
app.use('/api/products', products);
app.use('/api/checkout', checkout);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port ${port}`));