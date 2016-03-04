var Question = require('../models').Question;

// get all questions
module.exports.getAll = function (req, res) {
  Question.findAll({
  }).then(function (Questions) {
    res.json(Questions);
  });
};

module.exports.getById = function (req, res) {
  Question.findOne({
    where: {
      id: req.params.id//Question
    }
  }).then(function (foundQuestion) {
    res.json(foundQuestion);
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
      .error(function (err) {
        console.log(err);
        res.status(400).json({message: "Invalid question format"});
      });
  }
  catch (e) {
    console.log(e);
    res.status(400).json({message: "Invalid question format"});
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
        where:{id:req.params.id}
      })
      .then(function(){
        res.json({message: "Question updated."});
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
    Question.destroy({
      where: {id: req.params.id}
    }).then(function (error) {
      if (error == 0)
        res.json({message: "Question doesn't exist."});
      else
        res.json({message: "Question was successfully deleted."})
    });
  }
  catch(e){
    console.log(e);
    res.status(400).json({message: "An error occurred."})
  }
};