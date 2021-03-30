const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let quizSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
}, {timestamps: true,
    collection: 'quizzes'
})

module.exports = mongoose.model('Quiz', quizSchema);
