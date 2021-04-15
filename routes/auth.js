const express = require('express');
const router = express.Router();

const { signup, signin, question, findAll, deleteQuiz, findAllQ,findStats,
    findAllAnsweredQuizzes, groupStats, submitTeacherForm, history, searchQuiz, 
    findStudentQuizzes, changePassword,findAllStudents, studentAnswers, 
    findTeachersQuizzes, updateQuiz, allowQuiz, verifyAccount } 
    = require('../controllers/auth.controller');

// POST REQUESTS
router.post('/signup', signup);
router.post('/changePassword', changePassword);
router.post('/signin', signin);
router.post('/verifyAccount', verifyAccount);
router.post('/question', question);
router.post('/history', history);
router.post('/postform/submit', submitTeacherForm);
router.post('/updateQuiz/:id', updateQuiz);
router.post('/allowQuiz/:id', allowQuiz);


// GET REQUESTS
router.get('/findAll', findAll);
router.get('/findAllQ', findAllQ);
router.get('/searchQuiz/:id', searchQuiz);
router.get('/findAllAnswered', findAllAnsweredQuizzes);
router.get('/findAllStudents', findAllStudents);
router.get('/findStats/:id', findStats);
router.get('/groupStats/:id', groupStats);
router.get('/studentQuizzes/:id', findStudentQuizzes);
router.get('/teacherQuizzes/:id', findTeachersQuizzes);
router.get('/studentAnswers/:id', studentAnswers);

// DELETE REQUESTS
router.delete('/delete/:id', deleteQuiz);


// UNUSED REQUESTS
// router.get('/test/all', saySomething);
// router.post('/auth/signin', login);
// router.get('/authenticated', verifyJWT, authenticated);

module.exports = router;