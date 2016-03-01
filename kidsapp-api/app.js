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

// route to authenticate with token
router.post("/authenticate", require('./routes/authenticate.js').post);

// check token passed with requests
router.use(require('./tokenValidator.js'));

// Student Routes.
router.get('/classes/:classId/students', require('./routes/student.js').getAll);
router.get('/classes/:classId/students/:studentId', require('./routes/student.js').getById);
router.post('/classes/:classId/students', require('./routes/student.js').post);
router.delete('/classes/:classId/students/:studentId', require('./routes/student.js').delete);
router.put('/classes/:classId/students/:studentId', require('./routes/student.js').put);

// Class Routes.
router.get('/classes/', require('./routes/class.js').getAll);
router.get('/classes/:id', require('./routes/class.js').getById);
router.post('/classes', require('./routes/class.js').post);
router.delete('/classes/:id', require('./routes/class.js').delete);
router.put('/classes/:id', require('./routes/class.js').put);
// Question Routes.
router.get('/question', require('./routes/question.js').get);
router.get('/question:id', require('./routes/question.js').get);
router.post('/question', require('./routes/question.js').post);
router.delete('/question:id', require('./routes/question.js').delete);
router.put('/question:id', require('./routes/question.js').put);
// Quizzes Routes.
router.get('/quiz', require('./routes/quiz.js').get);
router.get('/quiz:id', require('./routes/quiz.js').get);
router.post('/quiz', require('./routes/quiz.js').post);
router.delete('/quiz:id', require('./routes/quiz.js').delete);
router.put('/quiz:id', require('./routes/quiz.js').put);
// Question Results Routes.
router.get('/result', require('./routes/result.js').get);
router.get('/result:id', require('./routes/result.js').get);
router.post('/result', require('./routes/result.js').post);
router.delete('/result:id', require('./routes/result.js').delete);
router.put('/result:id', require('./routes/result.js').put);

// TODO /classes/:classId/teachers
// Teacher Routes.
router.get('/teachers', require('./routes/teacher.js').get);
router.get('/teachers/:id', require('./routes/teacher.js').get);
router.post('/teachers', require('./routes/teacher.js').post);
router.delete('/teachers/:id', require('./routes/teacher.js').delete);
router.put('/teachers/:id', require('./routes/teacher.js').put);
// Answer Routes.
router.get('/answer', require('./routes/answer.js').get);
router.get('/answer:id', require('./routes/answer.js').get);
router.post('/answer', require('./routes/answer.js').post);
router.delete('/answer:id', require('./routes/answer.js').delete);
router.put('/answer:id', require('./routes/answer.js').put);

app.use('/api', router);

models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0').then(function() {
  models.sequelize.sync({force: false}).then(startServer).error(function (err) {
    console.log(err);
  });
});

function startServer() {
  var server = app.listen(port, function () {
    console.log("API server listening on port " + server.address().port);
  });
}