const express = require('express');
const router = express.Router();

const { signup, signin, question, findAll, deleteQuiz, findOne, 
    findAllQ, findAllAnsweredQuizzes, findStats, groupStats, 
    submitTeacherForm, history } 
    = require('../controllers/auth.controller');

// POST REQUESTS
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/question', question);
router.post('/history', history);
router.post('/postform/submit', submitTeacherForm);

// GET REQUESTS
router.get('/findAll', findAll);
router.get('/findAllQ', findAllQ);
router.get('/findOne/:id', findOne);
router.get('/findAllAnswered', findAllAnsweredQuizzes);
router.get('/findStats/:id', findStats);
router.get('/groupStats/:id', groupStats);

// DELETE REQUESTS
router.delete('/delete/:id', deleteQuiz);


// UNUSED REQUESTS
// router.get('/test/all', saySomething);
// router.post('/auth/signin', login);
// router.get('/authenticated', verifyJWT, authenticated);

module.exports = router;