const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const path = require('path')
//Get access to endpoint files
const users = require('./routes/api/users');
const admin = require('./routes/api/admin');
const products = require('./routes/api/products');


const app = express();

app.use(cors('*'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//MongoDB Config
const db = require('./config/keys').mongoURI

//Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

//Use Routes
app.use('/api/users', users);
app.use('/api/admin', admin);
app.use('/api/products', products);

// Server static assets if in production 
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('Front/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'front', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port ${port}`));