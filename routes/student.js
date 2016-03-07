'use strict';

var Student = require('../models/index').Student;
var Class = require('../models/index').Class;

module.exports.getAll = function (req, res) {
  Class.findById(req.params.classId)
    .then(function (foundClass) {
      if (!foundClass) {
        res.status(404).json({message: "Class not found"});
      }
      else {
        Student.findAll({
            where: {
              ClassId: req.params.classId
            }
          })
          .then(function (students) {
            if (students.length === 0) {
              res.status(404).json({message: "No students found"});
            }
            else {
              var responseObj = [];
              students.forEach(function (val, i, students) {
                responseObj.push({
                  username: students[i].dataValues.username,
                  lastName: students[i].dataValues.lastName,
                  firstName: students[i].dataValues.firstName,
                  classId: students[i].dataValues.classId
                });
              });
              res.json(responseObj);
            }
          })
          .catch(function (err) {
            res.status(400).json(err.errors);
          });
      }
    });
};

module.exports.getById = function (req, res) {
  Class.findById(req.params.classId)
    .then(function (foundClass) {
      if (!foundClass) {
        res.status(404).json({message: "Class not found"});
      }
      else {
        Student.findOne({
            where: {
              username: req.params.studentId,
              ClassId: req.params.classId
            }
          })
          .then(function (student) {
            if (!student) {
              res.status(404).json({"message": "Student not found"});
            }
            else {
              res.json({
                username: student.username,
                firstName: student.firstName,
                lastName: student.lastName,
                ClassId: student.classId
              });
            }
          })
          .catch(function (err) {
            res.status(400).json(err.errors);
          });
      }
    });
};

module.exports.post = function (req, res) {
  try {
    Class.findById(req.params.classId)
      .then(function (foundClass) {
        if (!foundClass) {
          res.status(404).json({message: "Class not found"});
        }
        else {
          var student = Student.build({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            ClassId: req.params.classId
          });
          student.save()
            .then(function () {
              res.json(
                {message: "Inserted student successfully"});
            })
            .catch(function (err) {
              res.status(400).json(err.errors);
            });
        }
      });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({message: "An error occurred."});
  }
};

module.exports.put = function (req, res) {
  try {
    Class.findById(req.params.classId)
      .then(function (foundClass) {
        if (!foundClass) {
          res.status(404).json({message: "Class not found"});
        }
        else {
          Student.update(
            {
              username: req.body.username,
              lastName: req.body.lastName,
              firstName: req.body.firstName,
              password: req.body.password
            },
            {
              where: {
                username: req.params.studentId,
                ClassId: req.params.classId
              }
            })
            .then(function (updated) {
              if (updated > 0) {
                res.json({message: "Student updated"});
              }
              else {
                res.status(404).json({message: "Student not found"});
              }
            })
            .catch(function (err) {
              res.status(400).json(err.errors);
            });
        }
      });
  }
  catch (e) {
    console.error(e);
    res.status(500).json({message: "An error occurred"});
  }
};

// TODO requires update password route.

module.exports.delete = function (req, res) {
  try {
    Class.findById(req.params.classId)
      .then(function (foundClass) {
        if (!foundClass) {
          res.status(404).json({message: "Class not found"});
        }
        else {
          Student.destroy({
              where: {
                username: req.params.studentId,
                ClassId: req.params.classId
              }
            })
            .then(function (result) {
              if (result === 0) {
                res.status(404).json({message: "Student not found"});
              }
              else {
                res.json({message: "Student deleted"});
              }
            })
            .catch(function (err) {
              res.status(400).json(err.errors);
            });
          ;
        }
      });
  }
  catch (e) {
    console.error(e);
    res.status(500).json({message: "An error occurred"});
  }
}