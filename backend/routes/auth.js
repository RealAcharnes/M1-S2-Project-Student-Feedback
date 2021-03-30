const express = require('express');
const router = express.Router();

const { signup, signin, question, authenticated, verifyJWT, findAll, deleteQuiz, findOne, findAllQ } = require('../controllers/auth.controller');


router.post('/signup', signup);
router.post('/signin', signin);
router.post('/question', question);
router.get('/findAll', findAll);
router.get('/findAllQ', findAllQ);
router.delete('/delete/:id', deleteQuiz);
router.get('/findOne/:id', findOne)

// router.get('/authenticated', verifyJWT, authenticated);

module.exports = router;