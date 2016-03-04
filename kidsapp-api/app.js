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

// Class Routes.
router.get('/classes/', require('./routes/class.js').getAll);
router.get('/classes/:classId', require('./routes/class.js').getById);
router.post('/classes', require('./routes/class.js').post);
router.delete('/classes/:classId', require('./routes/class.js').delete);
router.put('/classes/:classId', require('./routes/class.js').put);

// Student Routes.
router.get('/classes/:classId/students', require('./routes/student.js').getAll);
router.get('/classes/:classId/students/:studentId', require('./routes/student.js').getById);
router.post('/classes/:classId/students', require('./routes/student.js').post);
router.delete('/classes/:classId/students/:studentId', require('./routes/student.js').delete);
router.put('/classes/:classId/students/:studentId', require('./routes/student.js').put);

// Question Routes.
router.get('/questions', require('./routes/question.js').getAll);
router.get('/questions/:id', require('./routes/question.js').getById);
router.post('/questions', require('./routes/question.js').post);
router.delete('/questions/:id', require('./routes/question.js').delete);
router.put('/questions/:id', require('./routes/question.js').put);

// Answer Routes.
router.get('/questions/:questionId/answers', require('./routes/answer.js').getAll);
router.get('/questions/:questionId/answers/:answerId', require('./routes/answer.js').getById);
router.post('/questions/:questionId/answers', require('./routes/answer.js').post);
router.delete('/questions/:questionId/answers/:answerId', require('./routes/answer.js').delete);
router.put('/questions/:questionId/answers/:answerId', require('./routes/answer.js').put);

// Question Results Routes.
router.get('/question/:questionId/students/:studentId/results', require('./routes/result.js').getAll);
router.get('/question/:questionId/students/:studentId/results/:resultId', require('./routes/result.js').getById);
router.post('/question/:questionId/students/:studentId/results', require('./routes/result.js').post);
router.delete('/question/:questionId/students/:studentId/results/:resultId', require('./routes/result.js').delete);
router.put('/question/:questionId/students/:studentId/results/:resultId', require('./routes/result.js').put);

// Quiz Routes.
router.get('/quizzes', require('./routes/quiz.js').get);
router.get('/quizzes/:id', require('./routes/quiz.js').get);
router.post('/quizzes', require('./routes/quiz.js').post);
router.delete('/quizzes/:id', require('./routes/quiz.js').delete);
router.put('/quizzes/:id', require('./routes/quiz.js').put);
//router.put('/quizzes/:quizId/questions/:questionId', require('./routes/quiz.js').putQuizQuestion);

// Teacher Routes.
router.get('/teachers', require('./routes/teacher.js').getAll);
router.get('/teachers/:id', require('./routes/teacher.js').getById);
router.post('/teachers', require('./routes/teacher.js').post);
router.delete('/teachers/:id', require('./routes/teacher.js').delete);
router.put('/teachers/:id', require('./routes/teacher.js').put);



app.use('/api', router);

models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0').then(function() {
  // TODO change force back to FALSE
  models.sequelize.sync({force: true}).then(startServer).error(function (err) {
    console.log(err);
  });
});

function startServer() {
  var server = app.listen(port, function () {
    console.log("API server listening on port " + server.address().port);
  });
}