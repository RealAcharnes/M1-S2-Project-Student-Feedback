const jwt = require("jsonwebtoken");

exports.createJWT = (email, userId, duration) => {
   const payload = {
      email,
      userId,
      duration
   };
   return jwt.sign(payload, process.env.TOKEN_SECRET, {
     expiresIn: duration,
   });
}

exports.createVerificationJWT = (firstname,lastname,email,password,roles, duration) => {
   const payload2 = {
      firstname,
      lastname,
      email,
      password,
      roles
   };
   return jwt.sign(payload2, process.env.TOKEN_SECRET, {
     expiresIn: duration,
   });
}