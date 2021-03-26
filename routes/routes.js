const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

router.get('/test/all', controllers.saySomething);
router.post('/auth/signin', controllers.login)

module.exports = router;