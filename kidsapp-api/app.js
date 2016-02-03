var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.RESTPORT;

var router = express.Router();

router.use(function(req, res, next) {
	next();
});

app.use('/api', router);


// routes
router.get('/test', require('./routes/test.js').get);

app.listen(port);