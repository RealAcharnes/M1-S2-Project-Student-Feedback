const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {
    createJWT,
 } = require("../utils/auth.util"); 
const Quiz = require('../models/Quiz');
const Q = require('../models/Q');
const History = require('../models/History');


 const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

 exports.signup = (req, res, next) => {
    let { firstname, lastname, email, password, password_confirmation } = req.body;
    
    let errors = [];
    if (!firstname) {
      errors.push({ name: "required" });
    }
    if (!lastname) {
        errors.push({ name: "required" });
      }
    if (!email) {
      errors.push({ email: "required" });
    }
    if (!emailRegexp.test(email)) {
      errors.push({ email: "invalid" });
    }
    if (!password) {
      errors.push({ password: "required" });
    }
    if (!password_confirmation) {
      errors.push({
       password_confirmation: "required",
      });
    }
    if (password != password_confirmation) {
      errors.push({ password: "mismatch" });
    }
    if (errors.length > 0) {
      return res.status(422).json({ errors: errors });
    }
    
    User.findOne({email: email})
     .then(user=>{
        if(user){
           return res.status(422).json({ errors: [{ user: "email already exists" }] });
        }
        else {
           const user = new User({
             firstname: firstname,
             lastname: lastname,
             email: email,
             password: password,
           });
           
           bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(password, salt, function(err, hash) {
           if (err) throw err;
           user.password = hash;
           user.save()
               .then(response => {
                  res.status(200).json({
                    success: true,
                    result: response
                  })
               })
               .catch(err => {
                 res.status(500).json({
                    errors: [{ error: err }]
                 });
              });
           });
        });
       }
    }).catch(err =>{
        res.status(500).json({
          errors: [{ error: 'Something went wrong' }]
        });
    })
  }


  exports.signin = (req, res) => {
    let { email, password } = req.body;

    let errors = [];
    if (!email) {
      errors.push({ email: "required" });
    }
    if (!emailRegexp.test(email)) {
      errors.push({ email: "invalid email" });
    }
    if (!password) {
      errors.push({ password: "required" });
    }
    if (errors.length > 0) {
     return res.status(422).json({ 
      success: false, 
      errors: errors });
    }

    User.findOne({ email: email }).then(user => {
      if (!user) {
        return res.status(404).json({
          success: false,
          errors: [{ error: "User (email) not found" }],
        });
      } else {
         bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) {
             return res.status(400).json({ 
              success: false, 
              errors: [{ error:"incorrect passord" }] 
             });
            }
      let access_token = createJWT(
        user.email,
        user._id,
        3600
      );
      jwt.verify(access_token, process.env.TOKEN_SECRET, (err,decoded) => {
        if (err) {
           res.status(500).json({ 
            success: false, 
            errors: err });
        }
        if (decoded) {
            return res.status(200).json({
               success: true,
               token: access_token,
               message: user
            });
          }
        });
       }).catch(err => {
         res.status(500).json({ 
          success: false, 
          errors: err });
       });
     }
  }).catch(err => {
     res.status(500).json({ 
      success: false, 
      errors: err });
  });
}


exports.question = (req, res, next) => {
    let { question, desc } = req.body;
    
    let errors = [];
    if (!question) {
      errors.push({ name: "required" });
    }
    if (!desc) {
        errors.push({ name: "required" });
      }
   
    if (errors.length > 0) {
      return res.status(422).json({ errors: errors });
    }
    
   Quiz.findOne({question: question})
     .then(quiz=>{
        if(quiz){
           return res.status(422).json({ errors: [{ quiz: "question already exists" }] });
        }
        else {
           const quiz = new Quiz({
             question: question,
             desc: desc,
           });

           quiz.save()
           .then(response => {
              res.status(200).json({
                success: true,
                result: response
              })
           })
           .catch(err => {
             res.status(500).json({
                errors: [{ error: err }]
             });
          });
       }
    }).catch(err =>{
        res.status(500).json({
          errors: [{ error: 'Something went wrong' }]
        });
    })
  }

  exports.findAll = (req, res) => {
    const question = req.query.question;
    var condition = question ? { question: { $regex: new RegExp(question), $options: "i" } } : {};
  
    Quiz.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          errors: [{error: "Some error occurred while retrieving tutorials."}]
        });
      });
  };

  exports.findAllQ = (req, res) => {
    const quiz = req.query.quiz;
    var condition = quiz ? { quiz: { $regex: new RegExp(quiz), $options: "i" } } : {};
  
    Quiz.find(quiz)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          errors: [{error: "Some error occurred while retrieving tutorials."}]
        });
      });
  };

  exports.findAllAnsweredQuizzes = (req, res) => {
    const answer = req.query.quiz_id;
    var condition = answer ? { answer: { $regex: new RegExp(answer), $options: "i" } } : {};
  
    History.find(answer)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          errors: [{error: "Some error occurred while retrieving tutorials."}]
        });
      });
  };

// Find a single Quiz with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Quiz.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

// Find a single Quiz with an id and filter
exports.findStats = (req, res) => {
  const id = req.params.id;

  History.find({quiz_id : id}
    // , {
    // "quiz_answers.student_answers.question_answer_id" : 1,
    // "quiz_answers.student_answers.answer" : 1
    // }
    )
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found  Answer with id " + id });
      else {
        res.send(data)
          
      };
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Answer with id=" + id });
    });
};

// Find a single Quiz with an id and group
exports.groupStats = (req, res) => {
  const quiz_id = req.params.id;

  History.aggregate(
    [

      {
        $match :{ "quiz_id" : quiz_id}
      },

      {
        $group: 
        {
          "_id" : {
            "answer": "$quiz_answers.student_answers.answer",
            "explanation" :"$quiz_answers.student_answers.explanation"
          }, 
        }
      }

    ]
  )
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found  Answer with id " + id });
      else {
        res.send(data)
          
      };
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: err });
    });
};

  // Delete a Tutorial with the specified id in the request
exports.deleteQuiz = (req, res) => {
  console.log(req);
  const id = req.params.id;
  console.log(req.params.id);

  Quiz.findByIdAndRemove({ _id: id})
    .then(data => {
      if (!data) {
        res.status(404).json({
          errors: [{error : "Cannot delete Tutorial with id=${id}. Maybe Quiz was not found!"}]
        });
      } else {
        res.status(200).json({
          errors: [{error : "Quiz was deleted successfully!"}]
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        errors: [{error : "Could not delete Quiz with id=" + id }]
      });
    });
};

exports.history = async (req,res) => {
  let {quiz_id , quiz_answers } = req.body.answers;
  let student_id = quiz_answers.student_id;

  console.log(quiz_answers);

  let find_quiz = await History.findOne({quiz_id})

  if (!find_quiz) {
      const find_quiz = new History({
        quiz_id : quiz_id,
        quiz_answers : quiz_answers
      })

      find_quiz.save()
      .then(response => {
        res.status(200).json({
          success: true,
          result: response
        })
      })
      .catch(err => {
        res.status(500).json({
           errors: [{ error: err }]
        });
     });
  }
  else{
        let find_student = await History.findOne({quiz_id: quiz_id , "quiz_answers.student_id" :student_id})

        if(!find_student){
          find_quiz.quiz_answers.push(quiz_answers);
          find_quiz.save()
          .then(response => {
            res.status(200).json({
              success: true,
              result: response
            })
          })
          .catch(err => {
            res.status(500).json({
               errors: [{ error: err }]
            });
         });
        }
        else{
            return res.status(500).json({
              errors: [{ error: "You have answered this quiz already" }]
           });
        }


  }

}

exports.submitTeacherForm = (req, res, next) => {
  let { title, questions  } = req.body;

  function makeid(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
   }
   const quizboolean = true;
  //  while(quizboolean === true ){
  //     const quiz_id = makeid(6);
  //     // console.log(quiz_id);

  //     Quiz.findOne(quiz_id) 
  //     .then(find_quiz => {
  //         if(!find_quiz){
  //             return quizboolean = false;
  //             console.log("false");
  //         }
  //         else{
  //             return quizboolean = true;
  //             console.log("true");
  //         }
  //     })
      
  //  }

  const quiz_id = makeid(6);

   let errors = [];
   if (!questions) {
     errors.push({ error: "required" });
   }
   if (!title) {
       errors.push({ error: "required" });
     }
  
   if (errors.length > 0) {
     return res.status(422).json({ errors: errors });
   }
   console.log(title);
   const quiz = new Quiz({
      quiz: title,
      quiz_id: quiz_id,
      questions: questions
    });

    quiz.save()
    .then(response => {
       res.status(200).json({
         success: true,
         result: response
       })
    })
    .catch(err => {
      res.status(500).json({
         errors: [{ error: err }]
      });
   });

  // res.status(200).json({
  //     state : "success"
  // })

  // ne pas mettre en commentaire si vous voulez voir les informations qui arrivent de la requete POST
  console.log(req.body);
  console.log("--------------------------")
  console.log(req.body.questions);
};

  // exports.authenticated = (req, res) => {
  //   res.send(" You are authenticated")
  // }

  // exports.verifyJWT = (req, res, next) => {
  //   const token = req.headers['x-acccess-token']

  //   if(!token){
  //     res.send(" Please login")
  //   }
  //   else{
  //     jwt.verify(access_token, process.env.TOKEN_SECRET, (err,decoded) => {
  //       if (err) {
  //          res.status(500).json({ errors: err });
  //       }
  //       if (decoded) {
  //         req.userId = decoded.id;
  //         next();

  //           // return res.status(200).json({
  //           //    success: true,
  //           //    token: access_token,
  //           //    message: user
  //           // });
  //         }
  //       });
      
  //   }
  // }  