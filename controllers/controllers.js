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

module.exports.saySomething = saySomething;
module.exports.login = login;