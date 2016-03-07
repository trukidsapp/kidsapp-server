var Quiz = require('../models').Quiz;
var Question = require('../models').Question;

module.exports.getAll = function (req, res) {
  Quiz.findAll()
    .then(function (quizzes) {
      if(quizzes.length === 0){
        res.status(404).json({message: "No quizzes found"});
      }
      else{
        res.json(quizzes);
      }
    })
    .catch(function(err){
      res.status(400).json(err.errors);
    });
};

module.exports.getById = function (req, res) {
  Quiz.findById(req.params.quizId)
    .then(function(quiz){
      if(!quiz){
        res.status(404).json({message: "Quiz not found"});
      }
      else{
        res.json(quiz);
      }
    })
    .catch(function(err){
      res.status(400).json(err.errors);
    });
};

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
      .catch(function(err){
        res.status(400).json(err.errors);
      });
  }
  catch (e) {
    console.log(e);
    res.status(500).json({message: "An error occurred."});
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
      .then(function(updated){
        if(updated > 0 ){
          res.json({message: "Quiz updated."});
        }
        else{
          res.status(404).json({message:"Quiz not found"});
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

module.exports.putQuestion = function (req, res) {
  try{
    Quiz.findById(req.params.quizId)
      .then(function(quiz){
        if(!quiz){
          res.status(404).json({message: "Quiz not found"});
        }
        else{
          Question.findById(req.params.questionId)
            .then(function(question){
              if(!question){
                res.status(404).json({message: "Question not found"});
              }
              else{
                question.addQuiz(req.params.quizId)
                  .then(function(){
                    res.json({message: "Question associated with quiz."});
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
    Quiz.destroy({
      where: {id: req.params.quizId}
    }).then(function (error) {
      if (error == 0)
        res.json({message: "Quiz doesn't exist."});
      else
        res.json({message: "Quiz was successfully deleted."});
    });
  }
  catch(e){
    console.log(e);
    res.status(500).json({message: "An error occurred."});
  }
};



