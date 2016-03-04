var Result = require('../models').Result;

// YYYY-MM-DDThh:mm:ssTZD
module.exports.getAll = function (req, res) {
  try {
    Result.findAll({
      where : {
        QuestionId : req.params.questionId,
        StudentUsername : req.params.studentId
      }
    }).then(function (Results) {
      res.json(Results);
    });
  }
  catch (e) {
    console.log(e);
    res.status(400).json({message: "Invalid class format"});
  }
};

module.exports.getById = function (req, res) {
  try {
    Result.findOne({
      where: {
        where : {
          id : req.params.resultId,
          QuestionId : req.params.questionId,
          StudentUsername : req.params.studentId
        }
      }
    }).then(function (foundResult) {
      res.json(foundResult);
    });
  }
  catch (e) {
    console.log(e);
    res.status(400).json({message: "Invalid class format"});
  }
};

// create a Result
module.exports.post = function (req, res) {
  try {
    if(!req.body.startTime || !req.body.endTime || !req.body.isCorrect || !req.body.response) {
      res.status(400).json({message: "Invalid result request format."});
    }
    else{
      var newResult = Result.build({
        startTime: req.body.startTime,
        endTime : req.body.endTime,
        isCorrect : req.body.isCorrect,
        response : req.body.response,
        QuestionId : req.params.questionId,
        StudentUsername : req.params.studentId
      });
      newResult.save()
        .then(function () {
          res.json(
            {message: "Inserted class successfully"});
        })
        .error(function (err) {
          console.log(err);
          res.status(400).json({message: "Invalid class format"});
        });
    }
  }
  catch (e) {
    console.log(e);
    res.status(400).json({message: "Invalid class format"});
  }
};

module.exports.put = function (req, res) {
  try{
    if(!req.body.startTime || !req.body.endTime || !req.body.isCorrect || !req.body.response) {
      res.status(400).json({message: "Invalid result request format."});
    }
    else{
      Result.update(
        {
          startTime: req.body.startTime,
          endTime : req.body.endTime,
          isCorrect : req.body.isCorrect,
          response : req.body.response,
          QuestionId : req.params.questionId,
          StudentUsername : req.params.studentId
        },
        {
          where:{id:req.params.id.substring(1)}
        })
        .then(function(){
          res.json({message: "Result updated."});
        })
        .error(function(error){
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
    Result.destroy({
      where: {
        id: req.params.id,
        QuestionId : req.params.questionId,
        StudentUsername : req.params.studentId
      }
    }).then(function (error) {
      if (error == 0)
        res.json({message: "Result doesn't exist."});
      else
        res.json({message: "Result was successfully deleted."})
    });
  }
  catch(e){
    console.log(e);
    res.status(400).json({message: "An error occurred."})
  }
};