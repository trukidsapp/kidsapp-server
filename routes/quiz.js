var Quiz = require('../models').Quiz;

// get all Quizzes
module.exports.get = function (req, res) {
  if (req.params.quizId != null) {
    Quiz.findOne({
      //include: [ models.Quiz ]
      where: {
        id: req.params.quizId//Quiz
      }
    }).then(function (foundQuiz) {
      res.json(foundQuiz);
    });
  }
  else {
    Quiz.findAll({
      //include: [ models.Quiz ]
    }).then(function (Quizzes) {
      res.json(Quizzes);
    });
  }
};

// create a Quiz
module.exports.post = function (req, res) {
  try {
    var newQuiz = Quiz.build({
      quizName: req.body.quizName,
      gradeLevel: req.body.gradeLevel
    });
    newQuiz.save()
      .then(function () {
        res.json(
          {message: "Inserted quiz successfully"});
      })
      .error(function (err) {
        console.log(err);
        res.status(400).json({message: "Invalid quiz format"});
      });
  }
  catch (e) {
    console.log(e);
    res.status(400).json({message: "Invalid quiz format"});
  }
};

module.exports.put = function (req, res) {
  try{
    Quiz.update(
      {
        quizName: req.body.quizName,
        gradeLevel: req.body.gradeLevel
      },
      {
        where:{id:req.params.quizId}
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
      where: {id: req.params.quizId}
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