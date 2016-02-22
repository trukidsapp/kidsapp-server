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
router.get('/classes', require('./routes/class.js').get);
router.get('/classes:id', require('./routes/class.js').get);
router.post('/classes', require('./routes/class.js').post);
router.delete('/classes:id', require('./routes/class.js').delete);
router.put('/classes:id', require('./routes/class.js').put);
// Question Routes.
router.get('/questions', require('./questions/question.js').get);
router.get('/questions:id', require('./questions/question.js').get);
router.post('/questions', require('./routes/question.js').post);
router.delete('/questions:id', require('./routes/question.js').delete);
router.put('/questions:id', require('./routes/question.js').put);

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