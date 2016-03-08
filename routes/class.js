'use strict';

var Class = require('../models').Class;
var Teacher = require('../models').Teacher;
var Quiz = require('../models').Quiz;

module.exports.getAll = function (req, res) {
  Teacher.findById(req.params.teacherId)
    .then(function (foundTeacher) {
      if (!foundTeacher) {
        res.status(404).json({message: "Teacher not found"});
      }
      else {
        return Class.findAll({
          where: {
            TeacherUsername: req.params.teacherId
          }
        })
          .then(function (classes) {
            if (classes.length === 0) {
              res.status(404).json({message: "No classes found."});
            }
            else {
              res.json(classes);
            }
          })
          .catch(function (err) {
            res.status(400).json(err.errors);
          });
      }
    });
};

module.exports.getById = function (req, res) {
  Teacher.findById(req.params.teacherId)
    .then(function (foundTeacher) {
      if (!foundTeacher) {
        res.status(404).json({message: "Teacher not found"});
      }
      else {
        return Class.findOne({
          where: {
            id: req.params.classId,
            TeacherUsername: req.params.teacherId
          }
        })
          .then(function (foundClass) {
            if (foundClass == null) {
              res.status(404).json({message: "Class not found"});
            }
            else {
              res.json(foundClass);
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
    Teacher.findById(req.params.teacherId)
      .then(function (foundTeacher) {
        if (!foundTeacher) {
          res.status(404).json({message: "Teacher not found"});
        }
        else {
          var newClass = Class.build({
            className: req.body.className,
            grade: req.body.grade,
            TeacherUsername: req.params.teacherId
          });
          return newClass.save()
            .then(function () {
              res.json(
                {message: "Inserted class successfully"});
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

module.exports.put = function (req, res) {
  try {
    return Teacher.findById(req.params.teacherId)
      .then(function (foundTeacher) {
        if (!foundTeacher) {
          res.status(404).json({message: "Teacher not found"});
        }
        else if (req.params.teacherId != req.body.TeacherUsername) {
          //change teacher for class, body contains teacher other than the current one
          console.log("New teacher updated.");
          return Teacher.findById(req.body.TeacherUsername)
            .then(function (foundTeacherTwo) {
              if (!foundTeacherTwo) {
                res.status(404).json({message: "Teacher to update not found."});
              }
              else {
                return Class.update(
                  {
                    className: req.body.className,
                    grade: req.body.grade,
                    TeacherUsername: req.body.TeacherUsername
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
                  .catch(function (err) {
                    res.status(400).json(err.errors);
                  });
              }
            })
        }
        else {
          return Class.update(
            {
              className: req.body.className,
              grade: req.body.grade
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
            .catch(function (err) {
              res.status(400).json(err.errors);
            });
        }
      })
      .catch(function (err) {
        res.status(400).json(err.errors);
      });
  }
  catch (e) {
    console.error(e);
    res.status(500).json({message: "An error occurred."});
  }
};

module.exports.putQuiz = function (req, res) {
  try{
    return Class.findById(req.params.classId)
      .then(function(foundClass){
        if(!foundClass){
          res.status(404).json({message: "Class not found"});
        }
        else{
          return Quiz.findById(req.params.quizId)
            .then(function(quiz){
              if(!quiz){
                res.status(404).json({message: "Quiz not found"});
              }
              else{
                quiz.addClass(req.params.quizId)
                  .then(function(){
                    res.json({message: "Quiz associated with class."});
                  })
                  .catch(function(err){
                    res.status(400).json(err.errors);
                  });
              }
            })
            .catch(function(err){
              res.status(400).json(err.errors);
            });
        }
      })
      .catch(function(err){
        res.status(400).json(err.errors);
      });
  }
  catch(e){
    console.log(e);
    res.status(500).json({message: "An error occurred."});
  }
};

module.exports.delete = function (req, res) {
  try {
    return Teacher.findById(req.params.teacherId)
      .then(function (foundTeacher) {
        if (!foundTeacher) {
          res.status(404).json({message: "Teacher not found"});
        }
        else {
          return Class.destroy({
              where: {
                id: req.params.classId,
                TeacherUsername: req.params.teacherId
              }
            })
            .then(function (result) {
              if (result === 0) {
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