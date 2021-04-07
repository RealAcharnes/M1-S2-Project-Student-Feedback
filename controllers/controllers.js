const Quiz = require("../models/Quiz");

const saySomething = (req, res, next) => {
    res.status(200).json({
        body: 'Hello from the server!'
    });
};

const login = (req, res, next) => {
    res.status(200).json({
        accessToken : "Un token",
        username : "Jc",
        roles : ["USER_LAMBDA", "ROLE_ADMIN"],
        id : "Jcc",
        email : "email@test.com"
    });
};

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
     //const quizboolean = true;
    //  while(quizboolean === true ){
    //     const quiz_id = makeid(6);

    //     Quiz.findOne({ quiz_id : quiz_id})
    //     .then(find_quiz => {
    //         if(find_quiz){
    //             quizboolean = true;
    //         }
    //         else{
    //             quizboolean = false;
    //             console.log(quiz_id);
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
    // console.log(req.body);
    // console.log("--------------------------")
    // console.log(req.body.questions);
};

// module.exports.saySomething = saySomething;
// module.exports.login = login;
// module.exports.submitTeacherForm = submitTeacherForm;