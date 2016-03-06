var Question = require('../models').Question;

module.exports.getAll = function (req, res) {
  Question.findAll({
  }).then(function (questions) {
    if(questions.length === 0){
      res.status(404).json({message: "No questions found"});
    }
    else{
      res.json(questions);
    }
  })
  .catch(function(err){
    res.status(400).json(err.errors);
  });
};

module.exports.getById = function (req, res) {
  Question.findById(req.params.questionId)
  .then(function (question) {
    if(!question){
      res.status(404).json({message: "Question not found"});
    }
    else{
      res.json(question);
    }
  })
  .catch(function(err){
    res.status(400).json(err.errors);
  });
};

module.exports.post = function (req, res) {
  try {
    var newQuestion = Question.build({
      subject: req.body.subject,
      difficulty: req.body.difficulty,
      hint: req.body.hint,
      type: req.body.type,
      text: req.body.text
    });
    newQuestion.save()
      .then(function () {
        res.json(
          {message: "Inserted question successfully"});
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
    Question.update(
      {
        subject: req.body.subject,
        difficulty: req.body.difficulty,
        hint: req.body.hint,
        type: req.body.type,
        text: req.body.text
      },
      {
        where:{id:req.params.questionId}
      })
      .then(function(updated){
        if (updated > 0 ){
          res.json({message: "Question updated."});
        }
        else{
          res.status(404).json({message:"Question not found"});
        }
      })
      .catch(function(err){
        res.status(400).json(err.errors);
      });
  }
  catch(e){
    console.log(e);
    res.status(500).json({message: "An error occurred."})
  }
};

module.exports.delete = function (req, res) {
  try {
    Question.destroy({
      where: {id: req.params.questionId}
    }).then(function (deleteResult) {
      if (deleteResult === 0){
        res.json({message: "Question doesn't exist."});
      }
      else{
        res.json({message: "Question was successfully deleted."})
      }
    })
    .catch(function(err){
      res.status(400).json(err.errors);
    });
  }
  catch(e){
    console.log(e);
    res.status(500).json({message: "An error occurred."})
  }
};