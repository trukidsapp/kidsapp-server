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

router.use(function(req, res, next) {
	next();
});

app.use('/api', router);


// Student Routes.
router.get('/students', require('./routes/student.js').get);
router.post('/students', require('./routes/student.js').post);
// Class Routes.
router.get('/class', require('./routes/class.js').get);
router.get('/class:id', require('./routes/class.js').get);
router.post('/class', require('./routes/class.js').post);
router.delete('/class:id', require('./routes/class.js').delete);
router.put('/class:id', require('./routes/class.js').put);
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
// Teacher Routes.
router.get('/teacher', require('./routes/teacher.js').get);
router.get('/teacher:id', require('./routes/teacher.js').get);
router.post('/teacher', require('./routes/teacher.js').post);
router.delete('/teacher:id', require('./routes/teacher.js').delete);
router.put('/teacher:id', require('./routes/teacher.js').put);
// Answer Routes.
router.get('/answer', require('./routes/answer.js').get);
router.get('/answer:id', require('./routes/answer.js').get);
router.post('/answer', require('./routes/answer.js').post);
router.delete('/answer:id', require('./routes/answer.js').delete);
router.put('/answer:id', require('./routes/answer.js').put);

models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0').then(function() {
  models.sequelize.sync({force: true}).then(startServer).error(function (err) {
    console.log(err);
  });
});

function startServer() {
  var server = app.listen(port, function () {
    console.log("API server listening on port " + server.address().port);
  });
}