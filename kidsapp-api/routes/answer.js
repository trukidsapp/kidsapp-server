var Answer = require('../models').Answer;

module.exports.getAll = function (req, res) {
  Answer.findAll({
    where: {
      QuestionId : req.params.questionId
    }
  }).then(function (answers) {
    if(answers.length === 0){
      res.status(404).json({message: "No answers found."});
    }
    else{
      res.json(answers)
    }
  });
};

module.exports.getById = function (req, res) {
  Answer.findOne({
    where: {
      id: req.params.answerId,
      QuestionId: req.params.questionId
    }
  }).then(function (foundAnswer) {
    if(!foundAnswer){
      res.status(404).json({message: "Answer not found"});
    }
    else{
      res.json(foundAnswer);
    }
  });
};

module.exports.post = function (req, res) {
  try {
    // TODO catch QuestionId that doesn't exist.
    if(!req.body.isCorrect || !req.body.answerText){
      res.status(400).json({message: "Invalid answer request format."});
    }
    else{
      var newAnswer = Answer.build({
        isCorrect: req.body.isCorrect,
        answerText: req.body.answerText,
        QuestionId: req.params.questionId
      });
      newAnswer.save()
        .then(function () {
          res.json(
            {message: "Inserted Answer successfully"});
        })
        .error(function (err) {
          console.log(err);
          res.status(400).json({message: "Invalid Answer format"});
        });
    }
  }
  catch (e) {
    console.log(e);
    res.status(400).json({message: "Invalid Answer format"});
  }
};
module.exports.put = function (req, res) {
  try{
    // TODO catch QuestionId that doesn't exist.
    if(!req.body.isCorrect || !req.body.answerText){
      res.status(400).json({message: "Invalid answer request format."});
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
        .error(function (error) {
          res.json({message: "An error occurred"});
          console.log("Error message:" + error);
        });
    }
  }
  catch(e){
    console.log(e);
    res.status(400).json({message: "An error occurred."})
  }
};

module.exports.delete = function (req, res) {
  try {
    // TODO catch QuestionId that doesn't exist.
    Answer.destroy({
      where:{
        id: req.params.answerId,
        QuestionId: req.params.questionId
      }
    }).then(function (error) {
      if (error == 0)
        res.json({message: "Answer doesn't exist."});
      else
        res.json({message: "Answer was successfully deleted."})
    });
  }
  catch(e){
    console.log(e);
    res.status(400).json({message: "An error occurred."})
  }
};