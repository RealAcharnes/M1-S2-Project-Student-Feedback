const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let quizSchema = new Schema({

    quiz: {
        type: String,
        // required: true
    },
    quiz_id: {
        type: String,
        // required: true
    },
    questions: {
        type: Array,
        // required: true
    },
}, {timestamps: true,
    collection: 'quizzes'
})

module.exports = mongoose.model('Quiz', quizSchema);
