const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

//Get access to endpoint files
const usersAuth = require('./routes/api/users-auth');
const adminAuth = require('./routes/api/admin-auth');
const adminDashboard = require('./routes/api/admin-dashboard');
const usersProfile = require('./routes/api/users-profile');
const products = require('./routes/api/products');
const checkout = require('./routes/api/checkout')

const app = express();

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
app.use('/api/users-auth', usersAuth);
app.use('/api/admin-auth', adminAuth);
app.use('/api/admin-dashboard', adminDashboard);
app.use('/api/users-profile', usersProfile);
app.use('/api/products', products);
app.use('/api/checkout', checkout);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port ${port}`));