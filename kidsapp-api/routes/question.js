var Question = require('../models').Question;

// get all questions
module.exports.get = function (req, res) {
  console.log("Inside of question route");
  console.log(req.params.id);
  if (req.params.id != null) {
    Question.findOne({
      //include: [ models.Question ]
      where: {
        id: req.params.id.substring(1)//Question
      }
    }).then(function (foundQuestion) {
      res.json(foundQuestion);
    });
  }
  else {
    Question.findAll({
      //include: [ models.Question ]
    }).then(function (Questions) {
      res.json(Questions);
    });
  }
};
// create a Question
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
          {message: "Inserted question result successfully"});
      })
      .error(function (err) {
        console.log(err);
        res.status(400).json({message: "Invalid question result format"});
      });
  }
  catch (e) {
    console.log(e);
    res.status(400).json({message: "Invalid question result format"});
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
        where:{id:req.params.id.substring(1)}
      })
      .then(function(){
        res.json({message: "Question result updated."});
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
      where: {id: req.params.id.substring(1)}
    }).then(function (error) {
      if (error == 0)
        res.json({message: "Question result doesn't exist."});
      else
        res.json({message: "Question result was successfully deleted."})
    });
  }
  catch(e){
    console.log(e);
    res.status(400).json({message: "An error occurred."})
  }
};