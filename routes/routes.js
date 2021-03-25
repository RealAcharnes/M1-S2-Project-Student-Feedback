const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

router.get('/test/all', controllers.saySomething);

module.exports = router;