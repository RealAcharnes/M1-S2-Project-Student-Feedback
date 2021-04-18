const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let quizSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    quiz:{
        type: String,
        required: true
    },
    quiz_id:{ 
        type: String,
        required: true
    },
    questions:[
        {question_id:{ 
            type: String,
            required: true
        },
        question_title:{ 
            type: String,
            required: true
        },
        question_options:[
            {
                options_id : { 
                    type: String,
                    required: true
                },
                options_text : {
                    type: String,
                    required: true
                }

            }
            ]
        }],
    
}, {timestamps: true,
    collection: 'quizzes'
})

module.exports = mongoose.model('Q', quizSchema);