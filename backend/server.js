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

// connect mongodb database
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false    
})
    .then (() => console.log('Mongodb Database is Connected'))

//middlewares
app.use(bodyParser.json());
app.use(cors());

//routes middleware
app.use('/api', authRoutes);

const port = process.env.PORT || 5050;

app.listen(port, () => {
    console.log(`Welcome to the backend! Server is running on port ${port}`);
}); 