var Answer = require('../models').Answer;
var Question = require('../models').Question;

module.exports.getAll = function (req, res) {
  Question.findById(req.params.questionId)
    .then(function (foundQuestion) {
      if (!foundQuestion) {
        res.status(404).json({message: "Question not found"});
      }
      else {
        Answer.findAll({
            where: {
              QuestionId: req.params.questionId
            }
          })
          .then(function (answers) {
            if (answers.length === 0) {
              res.status(404).json({message: "No answers found."});
            }
            else {
              res.json(answers)
            }
          })
          .catch(function (err) {
            res.status(400).json(err.errors);
          });
      }
    });
};

module.exports.getById = function (req, res) {
  Question.findById(req.params.questionId)
    .then(function (foundQuestion) {
      if (!foundQuestion) {
        res.status(404).json({message: "Question not found"});
      }
      else {
        Answer.findOne({
            where: {
              id: req.params.answerId,
              QuestionId: req.params.questionId
            }
          })
          .then(function (foundAnswer) {
            if (!foundAnswer) {
              res.status(404).json({message: "Answer not found"});
            }
            else {
              res.json(foundAnswer);
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
    Question.findById(req.params.questionId)
      .then(function (foundQuestion) {
        if (!foundQuestion) {
          res.status(404).json({message: "Question not found"});
        }
        else {
          var newAnswer = Answer.build({
            isCorrect: req.body.isCorrect,
            answerText: req.body.answerText,
            QuestionId: req.params.questionId
          });
          newAnswer.save()
            .then(function () {
              res.json(
                {message: "Inserted answer successfully"});
            })
            .catch(function (err) {
              res.status(400).json(err.errors);
            });
        }
      });
  }
  catch (e) {
    console.log(e);
    res.status(500).json({message: "An error occurred."});
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
          Answer.update(
            {
              isCorrect: req.body.isCorrect,
              answerText: req.body.answerText
            },
            {
              where: {
                id: req.params.answerId,
                QuestionId: req.params.questionId
              }
            })
            .then(function () {
              res.json({message: "Answer updated."});
            })
            .catch(function (err) {
              res.status(400).json(err.errors);
            });
        }
      });
  }
  catch (e) {
    console.log(e);
    res.status(500).json({message: "An error occurred."});
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
          Answer.destroy({
              where: {
                id: req.params.answerId,
                QuestionId: req.params.questionId
              }
            })
            .then(function (deleteResult) {
              if (deleteResult === 0)
                res.json({message: "Answer doesn't exist."});
              else
                res.json({message: "Answer was successfully deleted."})
            })
            .catch(function (err) {
              res.status(400).json(err.errors);
            });
        }
      });
  }
  catch (e) {
    console.log(e);
    res.status(500).json({message: "An error occurred."});
  }
};