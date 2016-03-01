'use strict';

var Student = require('../models').Student;

module.exports.getAll = function (req, res) {
  Student.findAll({
    where : {
      ClassId : req.params.classId
    }
  }).then(function (students) {
    if (students.length === 0) {
      res.status(404).json({message: "no students found"});
    }
    else {
      var responseObj = [];
      students.forEach(function(val, i, students) {
        responseObj.push({
          username : students[i].dataValues.username,
          firstName : students[i].dataValues.firstName,
          lastName : students[i].dataValues.lastName,
          classId : students[i].dataValues.classId
        });
      });
      res.json(responseObj);
    }
  });
};

module.exports.getById = function (req, res) {
  Student.findOne({
    where : {
      username : req.params.studentId,
      ClassId : req.params.classId
    }
  }).then(function (student) {
    if (!student) {
      res.status(404).json({"message": "student not found"});
    }
    else {
      res.json({
        username : student.username,
        firstName : student.firstName,
        lastName : student.lastName,
        ClassId : student.classId
      });
    }
  });
};

module.exports.post = function (req, res) {
  try {
    if (!req.body.username || !req.body.firstName || !req.body.lastName || !req.body.password) {
      res.status(400).json({message: "Invalid student request format."});
    }

    var student = Student.build({
      username : req.body.username,
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      password : req.body.password,
      ClassId : req.params.classId
    });

    student.save()
      .then(function () {
        res.json(
          {message: "Inserted student successfully"});
      })
      .error(function (err) {
        throw err;
      });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({message: "An error occurred."});
  }
};

module.exports.put = function (req, res) {
  try {
    if (!req.body.username || !req.body.firstName || !req.body.lastName || !req.body.password) {
      res.status(400).json({message: "Invalid student request format."});
    }

    Student.update(
      {
        username: req.body.username,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        password: req.body.password
      },
      {
        where: {
          username : req.params.studentId,
          ClassId : req.params.classId
        }
      })
      .then(function (updated) {
        if (updated > 0) {
          res.json({message: "Student updated"});
        }
        else {
          res.status(404).json({message: "Student not found"});
        }
      }).error(function (err) {
      throw err;
    });
  }
  catch (e) {
    console.error(e);
    res.status(500).json({message: "An error occurred"});
  }
};

module.exports.delete = function (req, res) {
  try {
    Student.destroy({
        where: {
          username : req.params.studentId,
          ClassId : req.params.classId
        }
      })
      .then(function (result) {
        if (!result) {
          res.status(404).json({message: "Student not found"});
        }
        else {
          res.json({message: "Student deleted"});
        }
      });
  }
  catch (e) {
    console.error(e);
    res.status(500).json({message: "An error occurred"});
  }
}