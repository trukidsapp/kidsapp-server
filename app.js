'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var models = require("./models");

var app = express();

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.RESTPORT || 8080;

var router = express.Router();

// allow CORS
var cors = require('cors');
app.use(cors());

// route to authenticate with token
// TODO Uncomment below.
//router.post("/authenticate", require('./routes/authenticate.js').post);

// check token passed with requests
// TODO Uncomment below.
//router.use(require('./tokenValidator.js'));

// TODO: confirm Class routes functional and tested. COMPLETED and VERIFIED.
// Class Routes.
router.get('/teachers/:teacherId/classes', require('./routes/class.js').getAll);
router.get('/teachers/:teacherId/classes/:classId', require('./routes/class.js').getById);
router.post('/teachers/:teacherId/classes', require('./routes/class.js').post);
router.delete('/teachers/:teacherId/classes/:classId', require('./routes/class.js').delete);
router.put('/teachers/:teacherId/classes/:classId', require('./routes/class.js').put);

// TODO: confirm Student routes functional and tested. COMPLETED and VERIFIED.
// Student Routes.
router.get('/classes/:classId/students', require('./routes/student.js').getAll);
router.get('/classes/:classId/students/:studentId', require('./routes/student.js').getById);
router.post('/classes/:classId/students', require('./routes/student.js').post);
router.delete('/classes/:classId/students/:studentId', require('./routes/student.js').delete);
router.put('/classes/:classId/students/:studentId', require('./routes/student.js').put);

// TODO: confirm Question routes functional and tested. COMPLETED and VERIFIED.
// Question Routes.
router.get('/questions', require('./routes/question.js').getAll);
router.get('/questions/:questionId', require('./routes/question.js').getById);
router.post('/questions', require('./routes/question.js').post);
router.delete('/questions/:questionId', require('./routes/question.js').delete);
router.put('/questions/:questionId', require('./routes/question.js').put);

// TODO: confirm Answer routes functional and tested. COMPLETED and VERIFIED.
// Answer Routes.
router.get('/questions/:questionId/answers', require('./routes/answer.js').getAll);
router.get('/questions/:questionId/answers/:answerId', require('./routes/answer.js').getById);
router.post('/questions/:questionId/answers', require('./routes/answer.js').post);
router.delete('/questions/:questionId/answers/:answerId', require('./routes/answer.js').delete);
router.put('/questions/:questionId/answers/:answerId', require('./routes/answer.js').put);

// TODO: confirm Results routes functional and tested.
// Results Routes
router.get('/questions/:questionId/students/:studentId/results', require('./routes/result.js').getAll);
router.get('/questions/:questionId/students/:studentId/results/:resultId', require('./routes/result.js').getById);
router.post('/questions/:questionId/students/:studentId/results', require('./routes/result.js').post);
router.delete('/questions/:questionId/students/:studentId/results/:resultId', require('./routes/result.js').delete);
router.put('/questions/:questionId/students/:studentId/results/:resultId', require('./routes/result.js').put);

// TODO: confirm Quiz routes functional and tested.
// Quiz Routes.
router.get('/quizzes', require('./routes/quiz.js').get);
router.get('/quizzes/:quizId', require('./routes/quiz.js').get);
router.post('/quizzes', require('./routes/quiz.js').post);
router.delete('/quizzes/:quizId', require('./routes/quiz.js').delete);
router.put('/quizzes/:quizId', require('./routes/quiz.js').put);
//router.put('/quizzes/:quizId/questions/:questionId', require('./routes/quiz.js').putQuizQuestion);

// TODO: confirm Teacher routes functional and tested. COMPLETED and VERIFIED.
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
    console.log("API server listening on port " + server.address().port);
  });
}