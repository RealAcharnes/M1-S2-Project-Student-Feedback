const express = require('express');
const router = express.Router();

const { deleteQuiz, findAllQ,findStats,findAllAnsweredQuizzes, groupStats,
    submitTeacherForm, history, searchQuiz,findStudentQuizzes, findAllStudents, 
    studentAnswers,findTeachersQuizzes, updateQuiz, allowQuiz, findOneAnsweredQuiz, } 
    = require('../controllers/controllers');


const { signup, signin, changePassword, verifyAccount } 
    = require('../controllers/auth.controller');

// POST REQUESTS
router.post('/signup', signup);
router.post('/changePassword', changePassword);
router.post('/signin', signin);
router.post('/verifyAccount', verifyAccount);
router.post('/history', history);
router.post('/postform/submit', submitTeacherForm);
router.post('/updateQuiz/:id', updateQuiz);
router.post('/allowQuiz/:id', allowQuiz);


// GET REQUESTS
router.get('/findAllQ', findAllQ);
router.get('/searchQuiz/:id', searchQuiz);
router.get('/findAllAnswered', findAllAnsweredQuizzes);
router.get('/findOneAnswered/:id', findOneAnsweredQuiz);
router.get('/findAllStudents', findAllStudents);
router.get('/findStats/:id', findStats);
router.get('/groupStats/:id', groupStats);
router.get('/studentQuizzes/:id', findStudentQuizzes);
router.get('/teacherQuizzes/:id', findTeachersQuizzes);
router.get('/studentAnswers/:id', studentAnswers);

// DELETE REQUESTS
router.delete('/delete/:id/:email', deleteQuiz);


module.exports = router;