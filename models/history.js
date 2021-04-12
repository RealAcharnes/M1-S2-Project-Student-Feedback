const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let quizSchema = new Schema({
    quiz_id: {
        type: String,
        // required: true
    },
    quiz_title: {
        type: String,
        // required: true
    },
    quiz_answers : {
        type: Array,
        // required: true
    }
}, {timestamps: true,
    collection: 'history'
})

module.exports = mongoose.model('history', quizSchema);