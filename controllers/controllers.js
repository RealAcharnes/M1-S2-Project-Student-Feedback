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

    // ne pas mettre en commentaire si vous voulez voir les informations qui arrivent de la requete POST
    // console.log(req.body);
    // console.log("--------------------------")
    // console.log(req.body.questions);
};

module.exports.saySomething = saySomething;
module.exports.login = login;
module.exports.submitTeacherForm = submitTeacherForm;