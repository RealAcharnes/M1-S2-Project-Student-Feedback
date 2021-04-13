const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    firstname: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    roles: {
        type: Array,
        required: false
    },
    quizzes: {
        type: Array,
        required: false
    }
}, {timestamps: true,
    collection: 'users'
})

module.exports = mongoose.model('User', userSchema);
