'use strict';

var Student = require('../models').Student;

module.exports.get = function (req, res) {
  if (req.params.id === undefined) {
    //get all students
    Student.findAll({
      //include: [ models.Student ]
    }).then(function (students) {
      res.json(students);
    });
  }
  else {
    //get student by id
    Student.findOne({
      where : {
        username : req.params.id
      }
    }).then(function(student) {
      if (!student) {
        res.status(404).json({"message" : "student not found"});
      }
      else {
        res.json(student);
      }
    });
  }
};

// create a student
module.exports.post = function (req, res) {
    var student = Student.build({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    });

    if (!req.body.username ||
        !req.body.firstName ||
        !req.body.lastName ||
        !req.body.password) {
      console.log("Null values received.");
      res.status(400).json({message: "Invalid student format."});
    }
    else {
      student.save()
        .then(function () {
          res.json(
            {message: "Inserted student successfully"});
        })
        .error(function (err) {
          console.log(err);
          res.status(500).json({message: "error inserting student"});
        });
    }
};

module.exports.put = function (req, res) {
  try {
    Student.update(
      {
        username : req.body.username,
        lastName : req.body.lastName,
        firstName : req.body.firstName,
        password : req.body.password
      },
      {
        where : {
          username : req.params.id
        }
      })
      .then(function(updated) {
        if (updated > 0) {
          res.json({message: "Student updated"});
        }
        else {
          res.status(404).json({message:"Student not found"});
        }
      }).error(function(err) {
        throw err;
    });
  }
  catch (e) {
    console.error(e);
    res.status(500).json({message: "An error occurred"});
  }
};

// delete student
module.exports.delete = function (req, res) {
  try {
    Student.destroy({
      where : {
        username : req.params.id
      }
    })
      .then(function(result) {
      if (!result) {
        res.status(404).json({message : "Student not found"});
      }
      else {
        res.json({message : "Student deleted"});
      }
      });
  }
  catch(e) {
    console.error(e);
    res.status(500).json({message: "An error occurred"});
  }
}