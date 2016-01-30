'use strict';

var Student = require('../models').Student;

// get all students
module.exports.get = function(req, res) {
  Student.findAll({
    //include: [ models.Student ]
  }).then(function(students) {
    res.json(students);
  });

};

// create a student
module.exports.post = function(req, res) {
  try {
    var student = Student.build({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    });
    student.save()
      .then(function () {
        res.json(
          {message: "inserted student successfully"});
      })
      .error(function (err) {
        console.log(err);
        res.status(400).json({message: "invalid student format"});

      });
  }
  catch(e) {
    console.log(e);
    res.status(400).json({message: "invalid student format"});
  }
};