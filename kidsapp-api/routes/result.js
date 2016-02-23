var Result = require('../models').Result;

// YYYY-MM-DDThh:mm:ssTZD

// get all Results
module.exports.get = function (req, res) {
  try {
    console.log("In here");
    if (req.params.id != null) {
      Result.findOne({
        //include: [ models.Result ],
        where: {
          id: req.params.id.substring(1)//Result
        }
      }).then(function (foundResult) {
        res.json(foundResult);
      });
    }
    else {
      Result.findAll({
        //include: [ models.Result ]
      }).then(function (Results) {
        res.json(Results);
      });
    }
  }
  catch (e) {
    console.log(e);
    res.status(400).json({message: "Invalid class format"});
  }
};

// create a Result
module.exports.post = function (req, res) {
  try {
    var newResult = Result.build({
      startTime: req.body.startTime,
      endTime : req.body.endTime,
      isCorrect : req.body.isCorrect,
      response : req.body.response
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
  catch (e) {
    console.log(e);
    res.status(400).json({message: "Invalid class format"});
  }
};

module.exports.put = function (req, res) {
  try{
    Result.update(
      {
        startTime: req.body.startTime,
        endTime : req.body.endTime,
        isCorrect : req.body.isCorrect,
        response : req.body.response
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
  catch(e){
    console.log(e);
    res.status(400).json({message: "An error occurred."})
  }
};

module.exports.delete = function (req, res) {
  try {
    Result.destroy({
      where: {id: req.params.id.substring(1)}
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