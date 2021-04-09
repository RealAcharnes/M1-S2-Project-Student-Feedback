const express = require('express');
const router = express.Router();

const { signup, signin, question, findAll, deleteQuiz, 
    findAllQ, findAllAnsweredQuizzes, findStats, groupStats, 
    submitTeacherForm, history, searchQuiz, groupStudentQuizzes } 
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
router.get('/searchQuiz/:id', searchQuiz);
router.get('/findAllAnswered', findAllAnsweredQuizzes);
router.get('/findStats/:id', findStats);
router.get('/groupStats/:id', groupStats);
router.get('/studentQuizzes/:id', groupStudentQuizzes);

// DELETE REQUESTS
router.delete('/delete/:id', deleteQuiz);


// UNUSED REQUESTS
// router.get('/test/all', saySomething);
// router.post('/auth/signin', login);
// router.get('/authenticated', verifyJWT, authenticated);

module.exports = router;