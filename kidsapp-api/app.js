'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var models = require("./models");

var app = express();

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//var port = process.env.PORT || 8081;

var router = express.Router();

router.use(function(req, res, next) {
	next();
});

app.use('/api', router);


// routes
router.get('/students', require('./routes/student.js').get);
router.post('/students', require('./routes/student.js').post);

models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0').then(function() {
  models.sequelize.sync({force: true}).then(startServer).error(function (err) {
    console.log(err);
  });
});

function startServer() {
  // todo 8080 is temporary
  var server = app.listen(8080, function () {
    console.log("API server listening on port " + server.address().port);
  });
}