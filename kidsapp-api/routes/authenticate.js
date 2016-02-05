'use strict';

//TODO hash passwords

var Student = require('../models').Student;
var Teacher = require('../models').Teacher;
var jwt = require('jsonwebtoken');
var secret = process.env.KIDSAPPTOKENKEY;

module.exports.post = function (req, res) {
  var type = req.body.userType;
  var username = req.body.username;
  var password = req.body.password;

  if (!username || !password || !type) {
    res.status(400).json("error : must provide user type, username and password");
  }
  else {
    // check account table depending on type
    if (type === 'teacher') {
      authenticateTeacher(req, res);
    }
    else if (type === 'student') {
      authenticateStudent(req, res);
    }
    else {
      res.status(400).json({"error": "invalid authentication request"});
    }
  }
};

function authenticateStudent(req, res) {
  Student.findAll({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  }).then(function (students) {
    if (students.length === 1) {
      userAuthSuccess(students[0].dataValues, 'student', res);
    }
    else {
      userAuthFailure(res);
    }

  }).error(function (err) {
    console.log(err);
    userAuthFailure(res);
  });
}

function authenticateTeacher(req, res) {
  Teacher.findAll({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  }).then(function (teachers) {
    if (teachers.length === 1) {
      userAuthSuccess(teachers[0].dataValues, 'teacher', res);
    }
    else {
      userAuthFailure(res, req.body.username);
    }
  }).error(function (err) {
    console.log(err);
    userAuthFailure(res, req.body.username);
  });
}

function userAuthSuccess(result, userType, res) {
  console.log('AUTH success ' + result.username);
  var user = {
    username: result.username,
    userType: userType
  };
  // create token
  var token = jwt.sign(user, secret,
    {
      expiresIn: 43200 // seconds = 12 hours
    });

  res.json({
    token: token
  });

}

function userAuthFailure(res, username) {
  console.log('AUTH fail ' + username);
  res.status(403).json("error : not authorized");
}