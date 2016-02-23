/**
 * Created by darkhobbo on 2/8/2016.
 */
'use strict';

var Class = require('../models').Class;

module.exports.getAll = function (req, res) {
  Class.findAll({}).then(function (classes) {
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
    where: {
      id: req.params.id
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
    if (!req.body.className || !req.body.grade || !req.body.teacherUsername) {
      res.status(400).json({message: "Invalid class request format."});
    }

    var newClass = Class.build({
      className: req.body.className,
      grade: req.body.grade,
      TeacherUsername: req.body.teacherUsername
    });

    newClass.save()
      .then(function () {
        res.json(
          {message: "Inserted class successfully"});
      })
      .error(function (err) {
        throw err;
      });
  }
  catch (e) {
    console.error(e);
    res.status(500).json({message: "An error occurred"});
  }
};

module.exports.put = function (req, res) {
  try {
    if (!req.body.className || !req.body.grade || !req.body.teacherUsername) {
      res.status(400).json({message: "Invalid class request format."});
    }

    Class.update(
      {
        className: req.body.className,
        grade: req.body.grade,
        TeacherUsername: req.body.teacherUsername
      },
      {
        where: {id: req.params.id}
      })
      .then(function (updated) {
        if (updated > 0) {
          res.json({message: "Class updated."});
        }
        else {
          res.status(404).json({message: "Class not found"});
        }
      })
      .error(function (err) {
        throw err;
      });
  }
  catch (e) {
    console.error(e);
    res.status(500).json({message: "An error occurred."});
  }
};

module.exports.delete = function (req, res) {
  try {
    Class.destroy({
        where: {id: req.params.id}
      })
      .then(function (result) {
        if (!result) {
          res.status(404).json({message: "Class not found"});
        }
        else {
          res.json({message: "Class was successfully deleted."});
        }
      });
  }
  catch (e) {
    console.log(e);
    res.status(500).json({message: "An error occurred."});
  }
};