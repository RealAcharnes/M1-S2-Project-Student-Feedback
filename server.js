// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');

//import routes
const authRoutes = require('./routes/auth');
const { db } = require('./models/User');

// Create a new express application named 'app'
const app = express();

// Set our backend port to be either an environment variable or port 5000
const port = 5050;

// connect mongodb database
mongoose
    .connect("mongodb+srv://Project20:Project20password@cluster0.vhx6b.mongodb.net/project20?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false    
})
    .then (() => console.log('Mongodb Database is Connected'))

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
});

// Configure the bodyParser middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Configure the CORs middleware
app.use(cors());

//routes middleware
app.use('/api', authRoutes);

// This middleware informs the express application to serve our compiled React files
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
};

// Catch any bad requests
app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'Catch All'
    });
});

app.listen(port, () => {
    console.log(`Welcome to the backend! Server is running on port ${port}`);
}); 