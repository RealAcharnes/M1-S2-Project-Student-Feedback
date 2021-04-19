const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const {
    createJWT, createVerificationJWT
 } = require("../utils/auth.util"); 
const Quiz = require('../models/Quiz');
const Q = require('../models/Q');
const History = require('../models/history');


 const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

 exports.signup = (req, res, next) => {

  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  let { firstname, lastname, email, password, password_confirmation, roles} = req.body;
  
  if (!req.body.password){
    password= makeid(5);
    password_confirmation= password;
  }

  if (!req.body.roles){
    roles = ["ROLE_STUDENT"]
  }
  
  // console.log(firstname,lastname,email,password,roles);

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
    return res.status(422).json({ message: errors });
  }
  
  User.findOne({email: email})
   .then(user=>{
      if(user){
         return res.status(423).json({ message:  "l'email exite déjà" });
      }
      else {
        console.log('No User found')

        let token = createVerificationJWT(
          firstname,
          lastname,
          email,
          password,
          roles,
          '20m'
        );

        console.log(token)

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          host: 'smtp.gmail.com',
          auth: {
            user: 'neuroeducationfeedback@gmail.com',
            pass: 'Project20neuroeducation'
          }
        });
        
        const mailOptions = {
          from: 'neuroeducationfeedback@gmail.com',
          to: email,
          subject: 'Account Activation Link',
          html: `<p>Please Click <a href="https://neuroeducation-feedback.herokuapp.com/verifyAccount/${token}">Here</a> to verify your account</p>`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
            res.status(500).json({
              message: "Could not send verification email to "+email,
            })
          } else {
            res.status(200).json({
              success: true,
              message: `Verification email sent to ${email}... Check your email to activated your account`,
              mdpTmp: password,
            })
            console.log('Email sent: ' + info.response);
          }
        });
        // const user = new User({
        //    firstname: firstname,
        //    lastname: lastname,
        //    email: email.toLowerCase(),
        //    password: password,
        //    roles : roles,
        //    quizzes : []
        //  });


        // bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(password, salt, function(err, hash) {
        //     if (err) throw err;
        //     user.password = hash;
        //     user.save()
        //     .then(response => {
        //       res.status(200).json({
        //         success: true,
        //         message: response,
        //         mdpTmp: password,
        //       })
        //     })
        //     .catch(err => {
        //       res.status(500).json({
        //         message: err 
        //       });
        //     });
        //   });
        // });
     }
  }).catch(err =>{
      res.status(500).json({
        message:  'Something went wrong'
      });
  })
}

exports.verifyAccount =(req, res) => {
  const {token} = req.body

  if(token){
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) =>{
      if (err) {
        return res.status(500).json({ 
         success: false, 
         message: "Incorrect or Expired Link. Please Recreate account" 
        });
     }
       const { firstname, lastname, email, password, roles} =  decodedToken;

       User.findOne({email: email})
       .then(user=>{
          if(user){
             return res.status(423).json({ message:  "Votre compte a déjà été vérifié" });
          }

          const newUser = new User({
            firstname: firstname,
            lastname: lastname,
            email: email.toLowerCase(),
            password: password,
            roles : roles,
            quizzes : []
          });
      
      
          bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(password, salt, function(err, hash) {
          if (err) throw err;
              newUser.password = hash;
              newUser.save()
              .then(response => {
                res.status(200).json({
                  success: true,
                  message: 'Votre compte est activé !',
                  mdpTmp: password,
                })
              })
              .catch(err => {
                res.status(500).json({
                  message: 'Error Activating account' 
                });
              });
            });
          });
        })
        .catch(err=>{
          return res.status(423).json({ message:  "Your Account has Already been Verified" });
        })
     
    })
  }



}


  exports.signin = (req, res) => {
    let { email, password } = req.body;
    email = email.toLowerCase();
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
      message: errors });
    }

    User.findOne({ email: email }).then(user => {
      if (!user) {
        return res.status(404).json({
          success: false,
          message:  "User (email) not found",
        });
      } else {
         bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) {
             return res.status(400).json({ 
              success: false, 
              message: "incorrect password" 
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
            message: err });
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
          message: err });
       });
     }
  }).catch(err => {
     res.status(500).json({ 
      success: false, 
      message: err });
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
           return res.status(422).json({ errors: [{ quiz: "La question existe déjà" }] });
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
                message: response
              })
           })
           .catch(err => {
             res.status(500).json({
                message: err 
             });
          });
       }
    }).catch(err =>{
        res.status(500).json({
          message: 'Something went wrong' 
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
          message: "Some error occurred while retrieving Quizzes."
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
          message: "Some error occurred while retrieving Quizzes."
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
          message:  "Some error occurred while retrieving Answered Quizzes."
        });
      });
  };

// Find a single Quiz with an id
exports.searchQuiz = async (req, res) => {
  const id = req.params.id;

  Quiz.findOne({quiz_id : id})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Quiz with id: " + id +" NOT FOUND"});
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Quiz with id=" + id });
    });
};

// Find a single Quiz Answers with an id and filter
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

// Find all Students and filter
exports.findAllStudents = (req, res) => {
  // const id = req.params.id;
  // const role = ["ROLE_STUDENT"]
  User.find(
     {roles : ["ROLE_STUDENT"]}
    , {
    "firstname" : 1,
    "lastname" : 1,
    "email" : 1
    }
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

// Find a Student's answers for a specific quiz
exports.studentAnswers = (req, res) => {
  const quiz_id = req.params.id;

  History.aggregate(
    [

      {
        $match :{ "quiz_id" : quiz_id , "$quiz_answers.student_id" : "test20@gmail.com"}
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

exports.findStudentQuizzes = (req, res) => {
  const student_id = req.params.id;

  User.findOne({email: student_id},{"quizzes.quiz_id" :1, "quizzes.quiz_answers.student_answers":1 })
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

exports.findTeachersQuizzes = (req, res) => {
  const teacher_id = req.params.id;

  User.findOne({email: teacher_id},{"quizzes.quiz_id" :1})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Quiz with id " + id });
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

exports.updateQuiz = (req, res) => {
  const quiz_id = req.params.id;
  const updated_questions = req.body.updated_questions;
  console.log(updated_questions)
  Quiz.updateOne(
    {quiz_id: quiz_id},
    {
      $set: {
        questions : updated_questions
      }
    })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Quiz with id " + id });
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

exports.allowQuiz = (req, res) => {
  const quiz_id = req.params.id;
  const allowData = req.body.allow;
  console.log(allowData);
  console.log(quiz_id)
  Quiz.updateOne(
    {quiz_id: quiz_id},
    {
      $set: {
        allow : allowData
      }
    })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Quiz with id " + id });
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

  // Delete a Quiz with the specified id in the request
exports.deleteQuiz = (req, res) => {
  console.log(req);
  const id = req.params.id;
  console.log(req.params.id);

  Quiz.findByIdAndRemove({ _id: id})
    .then(data => {
      if (!data) {
        res.status(404).json({
          message: [{error : "Cannot delete Quiz with id=${id}. Maybe Quiz was not found!"}]
        });
      } else {
        res.status(200).json({
          message: [{error : "Quiz was deleted successfully!"}]
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message:  "Could not delete Quiz with id=" + id 
      });
    });
};

exports.history = async (req,res) => {
  let {quiz_id , quiz_title, quiz_answers } = req.body.answers;
  let student_id = quiz_answers.student_id;

  let errors = [];
  let messages = [];

  console.log('quiz:' +quiz_title);

  //CHECK IF QUIZ IS ALLOWED
  let teacher = await Quiz.findOne({quiz_id : quiz_id})
  let allow = await Quiz.findOne({quiz_id : quiz_id, allow : true})
  // FIND A SPECIFIC QUIZ WITH  ID FROM HISTORY COLLECTION
  let find_quiz = await History.findOne({quiz_id})
  // FIND THE STUDENT SUBMITTING THE QUIZ
  let find_student_history = await User.findOne({"email" : student_id})
  let checkExisting = await User.findOne({"email" : student_id, "quizzes.quiz_id" : quiz_id})

  console.log(teacher);

  // console.log(checkExisting)
  if(allow === null){
    return res.status(500).json({
    message: "Quiz is not opened for answering... Please contact "+ teacher.created_by
    })
  }
  else{
    // IF NO QUIZ FOUND, WE CREATE A NEW DOCUMENT AND PUSH STUDENT ANSWERS
    if (!find_quiz) {

      // SAVE TO HISTORY COLLECTION FOR TEACHER'S STATS
      const find_quiz = new History({
        quiz_id : quiz_id,
        quiz_title : quiz_title,
        quiz_answers : quiz_answers
      })
      find_quiz.save()
      .then(response => {
        messages.push('Inserted into history');
      })
      .catch(err => {
        errors.push('History error');
      });

      // SAVE TO USERS COLLECTION FOR RECORD KEEPING
      find_student_history.quizzes.push({
      quiz_id : quiz_id,
      quiz_title : quiz_title,
      quiz_answers : [quiz_answers]
      });

      find_student_history.save()
      .then(response => {
        messages.push('Inserted into Users');
      })
      .catch(err => {
        errors.push('Users error');
      });

      if (errors.length > 0) {
        return res.status(422).json({ 
          message: errors 
        });
      }
      else{
        return res.status(200).json({ 
          success: true,
          message: messages,
          line: 533
        });
      }
    }
    // IF QUIZ IS FOUND...
    else{
    // CHECK IF THE STUDENT ALREADY ANSWERED
    let find_student = await History.findOne({quiz_id: quiz_id , "quiz_answers.student_id" :student_id})

    if(checkExisting === null && !find_student){

    //SAVE STUDENT ANSWERS TO HISTORY
    find_quiz.quiz_answers.push(quiz_answers);
    find_quiz.save()
    .then(response => {
      messages.push('Inserted into history');
    })
    .catch(err => {
      errors.push('History error');
    });

    // SAVE TO USERS COLLECTION FOR RECORD KEEPING
    find_student_history.quizzes.push({
      quiz_id : quiz_id,
      quiz_title : quiz_title,
      quiz_answers : [quiz_answers]
      });
  
      find_student_history.save()
      .then(response => {
        messages.push('Inserted into Users');
      })
      .catch(err => {
        errors.push('Users error');
      });
  
      if (errors.length > 0) {
        return res.status(422).json({ 
          message: errors 
        });
      }
      else{
        return res.status(200).json({ 
          success: true,
          message: messages,
          line: 578 
        });
      }
    } 
    else{  
      // IF NOT FOUND....
      if(!find_student){

        //SAVE STUDENT ANSWERS TO HISTORY
        find_quiz.quiz_answers.push(quiz_answers);
        find_quiz.save()
        .then(response => {
          messages.push('Inserted into history');
        })
        .catch(err => {
          errors.push('History error');
        });

        //UPDATE THE STUDENTS LIST OF ANSWERED QUIZZES
        User.updateOne(
          {
            "email" : student_id, "quizzes.quiz_id":quiz_id
          },
          {
            "$push": {
              "quizzes.$.quiz_answers" : quiz_answers
            }
          }
        )
        .then(response => {
          messages.push('Inserted into User');
        })
        .catch(err => {
          errors.push('Insertion into User error');
        });

        // CHECK FOR ALL ERRORS AND SEND HEADERS TO THE FRONTEND
        if (errors.length > 0) {
          return res.status(422).json({ 
            message: errors 
          });
        }
        // IF NO ERRORS, SEND SUCCESS HEADERS TO THE FRONTEND
        else{
          return res.status(200).json({ 
            success: true,
            message: messages,
            line: 625
          });
        }
      }
      // IF A STUDENT IS FOUND, THEN UPDATE ONLY THE LIST OF ANSWERED QUESTIONS
      else{
        User.updateOne(
          {
            "email" : student_id, "quizzes.quiz_id":quiz_id
          },
          {
            "$push": {
              "quizzes.$.quiz_answers" : quiz_answers
            }
          }
        )
        .then(response => {
          return res.status(200).json({ 
            success: true,
            message: response,
            line: 647
          });
        })
        .catch(err => {
          return res.status(200).json({ 
            message: err,
            line: 654
          });
        });

        
        // SEND HEADERS TO THE FRONTEND
        // if (errors.length > 0) {
        //   return res.status(422).json({ 
        //     message: errors 
        //   });
        // }
        // else{
        //   return res.status(200).json({ 
        //     success: true,
        //     message: messages,
        //     line: 662
        //   });
        // }

      }
    }  

  }
  }


}

exports.submitTeacherForm = async (req, res, next) => {
  let { title, created_by, questions  } = req.body;

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
      created_by: created_by,
      allow: false,
      questions: questions
    });
    console.log(quiz);
    let findTeacher =  await User.findOne({email: created_by})
    quiz.save()
    .then(response => {
      // console.log("line 785")
      // res.status(200).json({
      // success: true,
      // message: response,
      // quizMdp: quiz_id
      // })
      

      if(findTeacher){
        findTeacher.quizzes.push({
          quiz_id: quiz_id
        })
   
        findTeacher.save()
        .then(findTeacherResponse => {
          console.log("line 794")
          return res.status(200).json({
          success: true,
          message: response,
          quizMdp: quiz_id
          })
        })
        .catch(error => {
          console.log("line 809")
          res.status(500).json({
            message:  error 
         });
        })
      }
      else{
        console.log("line 816")
        res.status(422).json({
          message:  "You are not a Teacher" 
       });
      }

    })
    .catch(err => {
      console.log("line 824")
      res.status(500).json({
         message:  err 
      });
   });

  //  let findTeacher = await User.findOne({email: created_by})

  //  if(findTeacher){
  //    findTeacher.quizzes.push({
  //      quiz_id: quiz_id
  //    })

  //    findTeacher.save()
  //    .then(response => {

  //    })
  //    .catch(error => {

  //    })
  //  }

};

exports.changePassword = async (req, res, next) => {

  let { email, old_password, password, password_confirmation} = req.body;
      
  let errors = [];
  if (!old_password) {
    errors.push({ old_password: "old password required" });
  }
  if (!email) {
    errors.push({ email: "email required" });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: "email invalid" });
  }
  if (!password) {
    errors.push({ password: "password required" });
  }
  if (!password_confirmation) {
    errors.push({
      password_confirmation: "password confirmation required",
    });
  }
  if (password != password_confirmation) {
    errors.push({ password: "password mismatch" });
  }
  if (errors.length > 0) {
    return res.status(422).json({ message: errors });
  }
  
  
  let user = await User.findOne({ email: email })

    if (!user) {
      return res.status(404).json({
        success: false,
        message:  "User (email) not found",
      });
    } 
    else {
        bcrypt.compare(old_password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return res.status(400).json({ 
            success: false, 
            message: "incorrect password" 
            });
          }

          bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(password, salt, function(err, hash) {
            if (err) throw err;
            console.log(typeof user) 
            User.updateOne({email: user.email}, {password : hash})
            .then(response => {
              res.status(200).json({
                success: true,
                message: response
              })
            }) 
            .catch(err => {  // update catch
              res.status(500).json({
                  message:  err 
              });
            }); 
            });
          });

        })
        .catch(err => {   // mismatch catch
          res.status(500).json({ 
          success: false, 
          message: err });
        });
    }

}