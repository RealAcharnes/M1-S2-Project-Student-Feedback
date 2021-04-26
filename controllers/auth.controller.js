const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const {createJWT, createVerificationJWT} = require("../utils/auth.util"); 
const Quiz = require('../models/Quiz');
const History = require('../models/history');

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// SIGNUP/REGISTER API... 
exports.signup = (req, res) => {
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
  
  let errors = [];
  if (!firstname) {
    errors.push("prénom obligatoire");
  }
  if (!lastname) {
      errors.push("nom obligatoire");
    }
  if (!email) {
    errors.push("email obligatoire");
  }
  if (!emailRegexp.test(email)) {
    errors.push("email non valide");
  }
  if (!password) {
    errors.push("mot de passe obligatoire");
  }
  if (!password_confirmation) {
    errors.push("confirmation du mot de passe requise");
  }
  if (password != password_confirmation) {
    errors.push("inadéquation du mot de passe" );
  }

  if (errors.length > 0) {
    return res.status(422).json({ message: errors.toString() });
  }
  
  User.findOne({email: email})
   .then(user=>{
      if(user){
         return res.status(423).json({ message:  "l'email exite déjà" });
      }
      else {
        let token = createVerificationJWT(
          firstname,
          lastname,
          email,
          password,
          roles,
          '20m'
        );

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          host: 'smtp.gmail.com',
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
          }
        });
        
        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Lien d'activation du compte",
          html: `<p>Veuillez cliquer <a href="https://neuroeducation-feedback.herokuapp.com/verifyAccount/${token}">Ici</a> pour vérifier votre compte</p>`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
            res.status(500).json({
              message: "Impossible d'envoyer le courriel de vérification à "+email,
            })
          } else {
            res.status(200).json({
              success: true,
              message: `Courriel de vérification envoyé à ${email}... Vérifiez votre e-mail pour activer votre compte dans les 20 minutes.`,
              mdpTmp: password,
            })
            console.log('Email sent: ' + info.response);
          }
        });
     }
  }).catch(err =>{
      res.status(500).json({
        message:  'Quelque chose a mal tourné'
      });
  })
};

// VERIFY ACCOUNT API
exports.verifyAccount =(req, res) => {
  const {token} = req.body

  if(token){
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) =>{
      if (err) {
        return res.status(500).json({ 
         success: false, 
         message: "Lien incorrect ou expiré. Veuillez recréer votre compte" 
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
                  message: "Erreur d'activation du compte" 
                });
              });
            });
          });
        })
        .catch(err=>{
          return res.status(423).json({ message:  "Votre compte a déjà été vérifié" });
        })
     
    })
  }
  else{
    return res.status(423).json({ message:  "Lien incorrect ou expiré. Veuillez recréer votre compte" });
  }



};


exports.signin = (req, res) => {
    let { email, password } = req.body;
    email = email.toLowerCase();
    let errors = [];
    if (!email) {
      errors.push("e-mail requis");
    }
    if (!emailRegexp.test(email)) {
      errors.push("email non valide");
    }
    if (!password) {
      errors.push("mot de passe requis");
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
          message:  "Utilisateur (email) non trouvé",
        });
      } else {
         bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) {
             return res.status(400).json({ 
              success: false, 
              message: "mot de passe incorrect" 
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
};

//FIND ALL QUIZZES
exports.findAllQ = (req, res) => {
    const quiz = req.query.quiz;
    var condition = quiz ? { quiz: { $regex: new RegExp(quiz), $options: "i" } } : {};
  
    Quiz.find(quiz)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Une erreur s'est produite lors de la récupération des Quiz."
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
          message:  "Une erreur s'est produite lors de la récupération des Quiz Réponses."
        });
      });
};

// Find a single Quiz with an id
exports.searchQuiz = async (req, res) => {
  const id = req.params.id;

  Quiz.findOne({quiz_id : id})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Quiz avec id : " + id +" NON TROUVÉ"});
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Erreur lors de la récupération d'un Quiz avec id=" + id });
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
        res.status(404).send({ message: "Non trouvé Réponse avec id " + id });
      else {
        res.send(data)
          
      };
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Erreur de récupération de la réponse avec id=" + id });
    });
};

// Find all Students and filter
exports.findAllStudents = (req, res) => {
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
        res.status(404).send({ message: "Impossible de récupérer les données "});
      else {
        res.send(data)
          
      };
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "erreur de récupération des données"});
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
        res.status(404).send({ message: " n'a pas pu regrouper les quiz avec l'id" + quiz_id });
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

// FIND ALL QUIZZES ANSWERED BY STUDENT
exports.findStudentQuizzes = (req, res) => {
  const student_id = req.params.id;

  User.findOne({email: student_id},{"quizzes.quiz_id" :1, "quizzes.quiz_answers.student_answers":1 })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "n'a pas pu trouver de quiz avec l'identifiant de l'étudiant" + student_id });
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

// FIND ALL QUIZZES CREATED BY TEACHER
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

// UPDATE QUIZ API
exports.updateQuiz = (req, res) => {
  const quiz_id = req.params.id;
  const updated_questions = req.body.updated_questions;
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

// ALLOW QUIZ TO BE TAKEN API
exports.allowQuiz = (req, res) => {
  const quiz_id = req.params.id;
  const allowData = req.body.allow;

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
  const id = req.params.id;
  const email = req.params.email;

  Quiz.deleteOne({ quiz_id: id})
    .then(data => {
      if (!data) {
        res.status(404).json({
          message: [{error : "Cannot delete Quiz with id=${id}. Maybe Quiz was not found!"}]
        });
      } 
      else {
        User.updateOne({"email": email },
          {$pull: { "quizzes" : { quiz_id: id } } }, (err) => {
              if (err) {
                  return res.status(404).json({ message: 'Problem Deleting from teacher History' });
              }
              return res.status(200).json({
                message: [{error : "Quiz was deleted successfully!"}]
              });
          }
        );
      }
    })
    .catch(err => {
      console.log("Could not delete");

      res.status(500).json({
        message:  "Could not delete Quiz with id=" + id 
      });
    });
};

// API FOR SUBMITTING STUDENT ANSWERS
exports.history = async (req,res) => {
  let {quiz_id , quiz_title, quiz_answers } = req.body.answers;
  let student_id = quiz_answers.student_id;

  let errors = [];
  let messages = [];

  //CHECK IF QUIZ IS ALLOWED
  let teacher = await Quiz.findOne({quiz_id : quiz_id})
  let allow = await Quiz.findOne({quiz_id : quiz_id, allow : true})
  // FIND A SPECIFIC QUIZ WITH  ID FROM HISTORY COLLECTION
  let find_quiz = await History.findOne({quiz_id})
  // FIND THE STUDENT SUBMITTING THE QUIZ
  let find_student_history = await User.findOne({"email" : student_id})
  // CHECK IF STUDENT HAS TAKEN QUIZ ALREADY
  let checkExisting = await User.findOne({"email" : student_id, "quizzes.quiz_id" : quiz_id})

  if(allow === null){
    return res.status(500).json({
      // QUIZ NOT OPENED
    message: "Le questionnaire n'est pas ouvert pour répondre... Veuillez contacter "+ teacher.created_by
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
      }
    }  

  }
  }


}

//API FOR SUBMITTING CREATED QUIZZES
exports.submitTeacherForm = async (req, res) => {
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
  //     console.log(quiz_id);

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
   const quiz = new Quiz({
      quiz: title,
      quiz_id: quiz_id,
      created_by: created_by,
      allow: false,
      questions: questions
    });
    let findTeacher =  await User.findOne({email: created_by})
    quiz.save()
    .then(response => {      
      if(findTeacher){
        findTeacher.quizzes.push({
          quiz_id: quiz_id,
          quiz_title: title
        })
   
        findTeacher.save()
        .then(findTeacherResponse => {
          return res.status(200).json({
          success: true,
          message: response,
          quizMdp: quiz_id
          })
        })
        .catch(error => {
          res.status(500).json({
            message:  error 
         });
        })
      }
      else{
        res.status(422).json({
          message:  "You are not a Teacher" 
       });
      }

    })
    .catch(err => {
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

// API FOR CHANGING USER PASSWORD
exports.changePassword = async (req, res) => {
  let { email, old_password, password, password_confirmation} = req.body;
      
  let errors = [];
  if (!old_password) {
    errors.push({ old_password: "ancient mot de passe requise" });
  }
  if (!email) {
    errors.push({ email: "email obligatoire" });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: "email non valide" });
  }
  if (!password) {
    errors.push({ password: "mot de passe requise" });
  }
  if (!password_confirmation) {
    errors.push({
      password_confirmation: "confirmation du mot de passe requise",
    });
  }
  if (password != password_confirmation) {
    errors.push({ password: "inadéquation du mot de passe" });
  }
  if (errors.length > 0) {
    return res.status(422).json({ message: errors });
  }
  
  
  let user = await User.findOne({ email: email })

    if (!user) {
      return res.status(404).json({
        success: false,
        message:  "Utilisateur (email) non trouvé",
      });
    } 
    else {
        bcrypt.compare(old_password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return res.status(400).json({ 
            success: false, 
            message: "mot de passe incorrect" 
            });
          }

          bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(password, salt, function(err, hash) {
            if (err) throw err;
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

};