'use strict';

var Class = require('../models').Class;
var Teacher = require('../models').Teacher;

module.exports.getAll = function (req, res) {
  Teacher.findOne({
    where: {
      username : req.params.teacherId
    }
  }).then(function (foundTeacher) {
    if (!foundTeacher) {
      res.status(404).json({message: "Teacher not found"});
    }
    else {
      Class.findAll({
        where: {
          TeacherUsername : req.params.teacherId
        }
      }).then(function (classes) {
        if (classes.length === 0) {
          res.status(404).json({message: "No classes found."});
        }
        else {
          res.json(classes);
        }
      });
    }
  });
};

module.exports.getById = function (req, res) {
  Teacher.findOne({
    where: {
      username: req.params.teacherId
    }
  }).then(function (foundTeacher) {
    if (!foundTeacher) {
      res.status(404).json({message: "Teacher not found"});
    }
    else {
      Class.findOne({
        where: {
          id: req.params.classId,
          TeacherUsername : req.params.teacherId
        }
      }).then(function (foundClass) {
        if (foundClass == null) {
          res.status(404).json({message: "Class not found"});
        }
        else {
          res.json(foundClass);
        }
      });
    }
  });
};

module.exports.post = function (req, res) {
  try {
    if (!req.body.className || !req.body.grade) {
      res.status(400).json({message: "Invalid class request format."});
    }
    else{
      Teacher.findOne({
        where: {
          username: req.params.teacherId
        }
      }).then(function (foundTeacher) {
        if (!foundTeacher) {
          res.status(404).json({message: "Teacher not found"});
        }
        else {
          var newClass = Class.build({
            className: req.body.className,
            grade: req.body.grade,
            TeacherUsername: req.params.teacherId
          });
          newClass.save()
            .then(function () {
              res.json(
                {message: "Inserted class successfully"});
            })
            .error(function (err) {
              throw err;
            });
        }
      });
    }
  }
  catch (e) {
    console.error(e);
    res.status(500).json({message: "An error occurred"});
  }
};

module.exports.put = function (req, res) {
  try {
    if (!req.body.className || !req.body.grade || !req.params.teacherId) {
      res.status(400).json({message: "Invalid class request format."});
    }
    else{
      Teacher.findOne({
        where: {
          username: req.params.teacherId//Teacher
        }
      }).then(function (foundTeacher) {
        if (!foundTeacher) {
          res.status(404).json({message: "Teacher not found"});
        }
        else if(req.params.teacherId != req.body.teacherUsername){
          console.log("New teacher updated.");
          Teacher.findOne({
            where: {
              username: req.body.teacherUsername//Teacher
            }
          }).then(function(foundTeacherTwo){
            if(!foundTeacherTwo){
              res.status(404).json({message: "Teacher to update not found."});
            }
            else{
              Class.update(
                {
                  className: req.body.className,
                  grade: req.body.grade,
                  TeacherUsername: req.body.teacherUsername
                },
                {
                  where: {
                    id: req.params.classId
                  }
                })
                .then(function (updated) {
                  if (updated > 0) {
                    res.json({message: "Class updated."});
                  }
                  else {
                    res.status(404).json({message: "Class not found"});
                  }
                })
                .error(function (err) {
                  throw err;
                });
            }
          })
        }
        else {
          Class.update(
            {
              className: req.body.className,
              grade: req.body.grade,
              TeacherUsername: req.body.teacherUsername
            },
            {
              where: {
                id: req.params.classId
              }
            })
            .then(function (updated) {
              if (updated > 0) {
                res.json({message: "Class updated."});
              }
              else {
                res.status(404).json({message: "Class not found"});
              }
            })
            .error(function (err) {
              throw err;
            });
        }
      });
    }
  }
  catch (e) {
    console.error(e);
    res.status(500).json({message: "An error occurred."});
  }
};

module.exports.delete = function (req, res) {
  try {
    Teacher.findOne({
      where: {
        username: req.params.teacherId
      }
    }).then(function (foundTeacher) {
      if (!foundTeacher) {
        res.status(404).json({message: "Teacher not found"});
      }
      else {
        Class.destroy({
            where: {
              id: req.params.classId,
              TeacherUsername : req.params.teacherId
            }
          })
          .then(function (result) {
            if (!result) {
              res.status(404).json({message: "Class not found"});
            }
            else {
              res.json({message: "Class was successfully deleted."});
            }
          });
      }
    });
  }
  catch (e) {
    console.log(e);
    res.status(500).json({message: "An error occurred."});
  }
};