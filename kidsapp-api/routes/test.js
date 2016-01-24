var express = require('express');
var router = express.Router();

/* GET test listing. */
router.get('/test', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

module.exports.testString = "Hello World";

