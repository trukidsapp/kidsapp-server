'use strict';

var Feedback = require('../models/index').Feedback;
var Teacher = require('../models/index').Teacher;

module.exports.post = function(req,res){
  try{
    Teacher.findById(req.params.teacherId)
      .then(function (foundTeacher) {
        if(!foundTeacher){
          res.status(404).json({message: "Teacher not found"});
        }
        else{
          var newFeedback = Feedback.build({
            title: req.body.title,
            errorCode: req.body.errorCode,
            type: req.body.type,
            text: req.body.text,
            TeacherUsername: req.params.teacherId
          });
          return newFeedback.save()
            .then(function(){
              res.json(
                {message: "Inserted feedback successfully"});
            })
            .catch(function(err){
              res.status(400).json(err.errors);
            });
        }
      });
  }
  catch (err){
    console.log(err);
    res.status(500).json({message: "An error occurred."});
  }
}