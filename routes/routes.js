const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

router.get('/test/all', controllers.saySomething);
router.post('/auth/signin', controllers.login);
router.post('/auth/adminsignup', controllers.adminSignUp);
router.post('/postform/submit', controllers.submitTeacherForm);

module.exports = router;