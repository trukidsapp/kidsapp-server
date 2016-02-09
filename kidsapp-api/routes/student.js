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
    /*
    console.log("Inside post.");
    console.log("username: " + req.body.username);
    console.log("firstName: " + req.body.firstName);
    console.log("lastName: " + req.body.lastName);
    console.log("password: " + req.body.password);
    */
    /*res.json(
        {message: "We received " + req.body.username
        + ", " + req.body.firstName + ", " + req.body.lastName + ", " + req.body.password}

    );*/
    if(req.body.username == null || req.body.firstName == null || req.body.lastName == null || req.body.password == null)
    {
      console.log("Null values received.");
      res.json({message: "Null values received."})
    }
    else{
      student.save()
          .then(function () {
            res.json(
                {message: "Inserted student successfully"});
          })
          .error(function (err) {
            console.log(err);
            res.status(400).json({message: "Invalid student format"});
          });
    }
  }
  catch(e) {
    console.log(e);
    res.status(400).json({message: "Invalid student format"});
  }
};