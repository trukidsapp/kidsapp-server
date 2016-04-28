'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var models = require("./models");

var app = express();

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 5000;

var router = express.Router();

// allow CORS
var cors = require('cors');
app.use(cors());

// route to authenticate with token
router.post("/authenticate", require('./routes/authenticate.js').post);

// check token passed with requests
router.use(require('./tokenValidator.js'));

// Class Routes.
router.get('/teachers/:teacherId/classes', require('./routes/class.js').getAll);
router.get('/teachers/:teacherId/classes/:classId', require('./routes/class.js').getById);
router.post('/teachers/:teacherId/classes', require('./routes/class.js').post);
router.delete('/teachers/:teacherId/classes/:classId', require('./routes/class.js').delete);
router.put('/teachers/:teacherId/classes/:classId', require('./routes/class.js').put);

// Student Routes.
router.get('/classes/:classId/students', require('./routes/student.js').getAll);
router.get('/classes/:classId/students/:studentId', require('./routes/student.js').getById);
router.post('/classes/:classId/students', require('./routes/student.js').post);
router.delete('/classes/:classId/students/:studentId', require('./routes/student.js').delete);
router.put('/classes/:classId/students/:studentId', require('./routes/student.js').put);

// Question Routes.
router.get('/questions', require('./routes/question.js').getAll);
router.get('/questions/:questionId', require('./routes/question.js').getById);
router.post('/questions', require('./routes/question.js').post);
router.delete('/questions/:questionId', require('./routes/question.js').delete);
router.put('/questions/:questionId', require('./routes/question.js').put);

// Answer Routes.
router.get('/questions/:questionId/answers', require('./routes/answer.js').getAll);
router.get('/questions/:questionId/answers/:answerId', require('./routes/answer.js').getById);
router.post('/questions/:questionId/answers', require('./routes/answer.js').post);
router.delete('/questions/:questionId/answers/:answerId', require('./routes/answer.js').delete);
router.put('/questions/:questionId/answers/:answerId', require('./routes/answer.js').put);

// Results Routes
router.get('/students/:studentId/results', require('./routes/result.js').getAll);
router.get('/students/:studentId/results/:resultId', require('./routes/result.js').getById);
router.post('/questions/:questionId/students/:studentId/results', require('./routes/result.js').post);
router.delete('/questions/:questionId/students/:studentId/results/:resultId', require('./routes/result.js').delete);
router.put('/questions/:questionId/students/:studentId/results/:resultId', require('./routes/result.js').put);

// Quiz Routes.
router.get('/quizzes', require('./routes/quiz.js').getAll);
router.get('/quizzes/:quizId', require('./routes/quiz.js').getById);
router.post('/quizzes', require('./routes/quiz.js').post);
router.delete('/quizzes/:quizId', require('./routes/quiz.js').delete);
router.put('/quizzes/:quizId', require('./routes/quiz.js').put);

// QuizQuestion Routes
router.put('/quizzes/:quizId/questions/:questionId', require('./routes/quiz.js').putQuestion);
router.get('/quizzes/:quizId/questions', require('./routes/quiz.js').getQuizQuestions);
router.delete('/quizzes/:quizId/questions/:questionId', require('./routes/quiz.js').removeQuestion);

// ClassQuiz Routes
router.put('/classes/:classId/quizzes/:quizId', require('./routes/class.js').putQuiz);
router.get('/classes/:classId/quizzes', require('./routes/class.js').getClassQuizzes);
router.delete('/classes/:classId/quizzes/:quizId', require('./routes/class.js').removeQuiz);

// Teacher Routes.
router.get('/teachers', require('./routes/teacher.js').getAll);
router.get('/teachers/:teacherId', require('./routes/teacher.js').getById);
router.post('/teachers', require('./routes/teacher.js').post);
router.delete('/teachers/:teacherId', require('./routes/teacher.js').delete);
router.put('/teachers/:teacherId', require('./routes/teacher.js').put);
router.put('/teachers/:teacherId/updatePassword', require('./routes/teacher.js').updatePassword);

app.use('/api', router);

models.sequelize.sync({force: false}).then(startServer).error(function (err) {
  console.log(err);
});


function startServer() {
  var server = app.listen(port, function () {
    console.log("API server listening on port " + port);
  });
}