const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();


//import routes
const authRoutes = require('./routes/auth');
const { db } = require('./models/User');

// app
const app = express();

// Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 5050;

// connect mongodb database
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false    
})
    .then (() => console.log('Mongodb Database is Connected'))

// Configure the bodyParser middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Configure the CORs middleware
app.use(cors());

//routes middleware
app.use('/api', authRoutes);

app.listen(port, () => {
    console.log(`Welcome to the backend! Server is running on port ${port}`);
}); 