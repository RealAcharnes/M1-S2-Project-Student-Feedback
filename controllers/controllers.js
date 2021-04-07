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

const submitTeacherForm = (req, res, next) => {
    res.status(200).json({
        state : "success"
    })
};

const adminSignUp = (req, res, next) => {
    //Do what you want
    res.status(200).json({
        state : "success"
    })
};

module.exports.saySomething = saySomething;
module.exports.login = login;
module.exports.submitTeacherForm = submitTeacherForm;
module.exports.adminSignUp = adminSignUp;