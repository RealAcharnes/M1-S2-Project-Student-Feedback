const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentAnswers = new Schema({
    student_answers: Array,
  }, { _id: false })

const quiz = new Schema({
    quiz_id: String,
    quiz_title: String,
    quiz_answers: {
        type: [studentAnswers]
    },
  }, { _id: false })

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
        type: [quiz],
        // quiz_id : String
        // ,
        required: false
    }
}, {timestamps: true,
    collection: 'users'
})

module.exports = mongoose.model('User', userSchema);
