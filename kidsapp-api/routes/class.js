/**
 * Created by darkhobbo on 2/8/2016.
 */
'use strict';

var Class = require('../models').Class;

module.exports.getAll = function (req, res) {
  Class.findAll({
    //include: [ models.Class ]
  }).then(function (classes) {
    if (classes.length === 0) {
      res.status(404).json({message: "no classes found"});
    }
    else {
      res.json(classes);
    }
  });
};

module.exports.getById = function (req, res) {
  Class.findOne({
    //include: [ models.Class ]
    where: {
      id: req.params.id//class
    }
  }).then(function (foundClass) {
    if (foundClass == null) {
      res.status(404).json({message: "class not found"});
    }
    else {
      res.json(foundClass);
    }
  });
};

// create a Class
module.exports.post = function (req, res) {
  try {
    var newClassName = req.body.className;
    var newGrade = req.body.grade;

    var newClass = Class.build({
      className: newClassName,
      grade: newGrade
    });
    /*
     console.log("Inside post.");
     console.log("Class Name: " + newClassName);
     console.log("Grade: " + newGrade);*/

    if (newClassName == null || newGrade == null) {
      console.log("Null values received.");
      res.json({message: "Null values received."});
    }
    else {
      newClass.save()
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
  try {
    if (req.body.className != null && req.body.grade != null) {
      Class.update(
        {
          className: req.body.className,
          grade: req.body.grade,
          TeacherUsername: req.body.TeacherUsername
        },
        {
          where: {id: req.params.id}
        })
        .then(function () {
          res.json({message: "Class updated."});
        })
        .error(function (error) {
          res.json({message: "An error occurred"});
          console.log("Error message:" + error);
        });
    }
    else
      res.json({message: "Incorrect number of parameters passed."});

  }
  catch (e) {
    console.log(e);
    res.status(400).json({message: "An error occurred."});
  }
};

module.exports.delete = function (req, res) {
  try {
    Class.destroy({
      where: {id: req.params.id}
    }).then(function (error) {
      if (error == 0)
        res.json({message: "Class doesn't exist."});
      else
        res.json({message: "Class was successfully deleted."});
    });
  }
  catch (e) {
    console.log(e);
    res.status(400).json({message: "An error occurred."});
  }
};