'use strict';

var jwt = require('jsonwebtoken');
var secret = process.env.KIDSAPPTOKENKEY;

module.exports = function(req, res, next) {
  var token = req.headers['api-token'];

  if (token) {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        return res.json({"message": "authentication failed."});
      } else {
        // save token to request
        req.decodedToken = decoded;
        next();
      }
    });
  }
  else {
    res.status(403).json({"message": "no token provided"});
  }
};