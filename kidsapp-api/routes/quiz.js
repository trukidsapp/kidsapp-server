/**
 * Created by darkhobbo on 2/22/2016.
 */

var Quiz = require('../models').Quiz;

// get all Quizs
module.exports.get = function (req, res) {
  console.log(req.params.id);
  if (req.params.id != null) {
    Quiz.findOne({
      //include: [ models.Quiz ]
      where: {
        id: req.params.id.substring(1)//Quiz
      }
    }).then(function (foundQuiz) {
      res.json(foundQuiz);
    });
  }
  else {
    Quiz.findAll({
      //include: [ models.Quiz ]
    }).then(function (Quizs) {
      res.json(Quizs);
    });
  }
};

// create a Quiz
module.exports.post = function (req, res) {
  try {
    var newQuiz = Quiz.build({
      subject: req.body.subject,
      difficulty: req.body.difficulty,
      hint: req.body.hint,
      type: req.body.type,
      text: req.body.text
    });
    newQuiz.save()
      .then(function () {
        res.json(
          {message: "Inserted class successfully"});
      })
      .error(function (err) {
        console.log(err);
        res.status(400).json({message: "Invalid class format"});
      });
  }
  catch (e) {
    console.log(e);
    res.status(400).json({message: "Invalid class format"});
  }
};

module.exports.put = function (req, res) {
  try{
    Quiz.update(
      {
        subject: req.body.subject,
        difficulty: req.body.difficulty,
        hint: req.body.hint,
        type: req.body.type,
        text: req.body.text
      },
      {
        where:{id:req.params.id.substring(1)}
      })
      .then(function(){
        res.json({message: "Quiz updated."});
      })
      .error(function(error){
        res.json({message: "An error occurred"});
        console.log("Error message:" + error);
      });
  }
  catch(e){
    console.log(e);
    res.status(400).json({message: "An error occurred."})
  }
};

module.exports.delete = function (req, res) {
  try {
    Quiz.destroy({
      where: {id: req.params.id.substring(1)}
    }).then(function (error) {
      if (error == 0)
        res.json({message: "Quiz doesn't exist."});
      else
        res.json({message: "Quiz was successfully deleted."})
    });
  }
  catch(e){
    console.log(e);
    res.status(400).json({message: "An error occurred."})
  }
};