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
  // Password Generator
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
  


  // Check if User Exists
  User.findOne({email: email})
   .then(user=>{
     // if user exists return
      if(user){
         return res.status(423).json({ message:  "l'email exite déjà" });
      }
      else {
        // create a jwt
        let token = createVerificationJWT(
          firstname,
          lastname,
          email,
          password,
          roles,
          '20m'
        );
        // send link via email for account verification
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
     // retrieve user information from decoded token and save
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
