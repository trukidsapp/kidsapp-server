var Answer = require('../models').Answer;

// get all Answers
module.exports.get = function (req, res) {
  console.log("Inside of Answer route");
  console.log(req.params.id);
  if (req.params.id != null) {
    Answer.findOne({
      //include: [ models.Answer ]
      where: {
        id: req.params.id.substring(1)//Answer
      }
    }).then(function (foundAnswer) {
      res.json(foundAnswer);
    });
  }
  else {
    Answer.findAll({
      //include: [ models.Answer ]
    }).then(function (Answers) {
      res.json(Answers);
    });
  }
};
// create a Answer
module.exports.post = function (req, res) {
  try {
    var newAnswer = Answer.build({
      isCorrect: req.body.isCorrect,
      answerText: req.body.answerText
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
  catch (e) {
    console.log(e);
    res.status(400).json({message: "Invalid Answer format"});
  }
};
module.exports.put = function (req, res) {
  try{
    Answer.update(
      {
        isCorrect: req.body.isCorrect,
        answerText: req.body.answerText
      },
      {
        where:{id:req.params.id.substring(1)}
      })
      .then(function(){
        res.json({message: "Answer updated."});
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
    Answer.destroy({
      where: {id: req.params.id.substring(1)}
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