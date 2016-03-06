var Result = require('../models').Result;
var Question = require('../models').Question;
var Student = require('../models').Student;

// YYYY-MM-DDThh:mm:ssTZD
module.exports.getAll = function (req, res) {
  try {
    Question.findById(req.params.questionId)
      .then(function (foundQuestion) {
        if (!foundQuestion) {
          res.status(404).json({message: "Question not found"});
        }
        else {
          Student.findById(req.params.studentId)
            .then(function (foundStudent) {
              if (!foundStudent) {
                res.status(404).json({message: "Student not found"});
              }
              else {
                Result.findAll({
                  where: {
                    QuestionId: req.params.questionId,
                    StudentUsername: req.params.studentId
                  }
                }).then(function (Results) {
                    res.json(Results);
                  })
                  .catch(function (err) {
                    res.status(400).json(err.errors);
                  });
              }
            });
        }
      });
  }
  catch (e) {
    console.log(e);
    res.status(500).json({message: "An error occurred."})
  }
};

module.exports.getById = function (req, res) {
  try {
    Question.findById(req.params.questionId)
      .then(function (foundQuestion) {
        if (!foundQuestion) {
          res.status(404).json({message: "Question not found"});
        }
        else {
          Student.findById(req.params.studentId)
            .then(function (foundStudent) {
              if (!foundStudent) {
                res.status(404).json({message: "Student not found"});
              }
              else {
                Result.findOne({
                  where: {
                    id: req.params.resultId,
                    QuestionId: req.params.questionId,
                    StudentUsername: req.params.studentId
                  }
                }).then(function (foundResult) {
                    res.json(foundResult);
                  })
                  .catch(function (err) {
                    res.status(400).json(err.errors);
                  });
              }
            });
        }
      });
  }
  catch (e) {
    console.log(e);
    res.status(500).json({message: "An error occurred."})
  }
};

module.exports.post = function (req, res) {
  try {
    Question.findById(req.params.questionId)
      .then(function (foundQuestion) {
        if (!foundQuestion) {
          res.status(404).json({message: "Question not found"});
        }
        else {
          Student.findById(req.params.studentId)
            .then(function (foundStudent) {
              if (!foundStudent) {
                res.status(404).json({message: "Student not found"});
              }
              else {
                var newResult = Result.build({
                  startTime: req.body.startTime,
                  endTime: req.body.endTime,
                  isCorrect: req.body.isCorrect,
                  response: req.body.response,
                  QuestionId: req.params.questionId,
                  StudentUsername: req.params.studentId
                });
                newResult.save()
                  .then(function () {
                    res.json(
                      {message: "Inserted result successfully"});
                  })
                  .catch(function (err) {
                    res.status(400).json(err.errors);
                  });
              }
            });
        }
      });
  }
  catch (e) {
    console.log(e);
    res.status(500).json({message: "An error occurred."})
  }
};

module.exports.put = function (req, res) {
  try {
    Question.findById(req.params.questionId)
      .then(function (foundQuestion) {
        if (!foundQuestion) {
          res.status(404).json({message: "Question not found"});
        }
        else {
          Student.findById(req.params.studentId)
            .then(function (foundStudent) {
              if (!foundStudent) {
                res.status(404).json({message: "Student not found"});
              }
              else {
                Result.update(
                  {
                    startTime: req.body.startTime,
                    endTime: req.body.endTime,
                    isCorrect: req.body.isCorrect,
                    response: req.body.response,
                    QuestionId: req.params.questionId,
                    StudentUsername: req.params.studentId
                  },
                  {
                    where: {id: req.params.resultId}
                  })
                  .then(function () {
                    res.json({message: "Result updated."});
                  })
                  .catch(function (err) {
                    res.status(400).json(err.errors);
                  });
              }
            });
        }
      });
  }
  catch (e) {
    console.log(e);
    res.status(500).json({message: "An error occurred."})
  }
};

module.exports.delete = function (req, res) {
  try {
    Question.findById(req.params.questionId)
      .then(function (foundQuestion) {
        if (!foundQuestion) {
          res.status(404).json({message: "Question not found"});
        }
        else {
          Student.findById(req.params.studentId)
            .then(function (foundStudent) {
              if (!foundStudent) {
                res.status(404).json({message: "Student not found"});
              }
              else {
                Result.destroy({
                  where: {
                    id: req.params.resultId,
                    QuestionId: req.params.questionId,
                    StudentUsername: req.params.studentId
                  }
                }).then(function (deleteResult) {
                    if (deleteResult === 0)
                      res.json({message: "Result doesn't exist."});
                    else
                      res.json({message: "Result was successfully deleted."})
                  })
                  .catch(function (err) {
                    res.status(400).json(err.errors);
                  });
              }
            });
        }
      });
  }
  catch (e) {
    console.log(e);
    res.status(500).json({message: "An error occurred."})
  }
};