var Teacher = require('../models/index').Teacher;

module.exports.getAll = function (req, res) {
  Teacher.findAll({}).then(function (teachers) {
      if (teachers.length === 0) {
        res.status(404).json({message: "No teachers found"});
      }
      else {
        var responseObj = [];
        teachers.forEach(function (val, i, teachers) {
          responseObj.push({
            username: teachers[i].dataValues.username,
            lastName: teachers[i].dataValues.lastName,
            firstName: teachers[i].dataValues.firstName,
            email: teachers[i].dataValues.email
          })
        });
        res.json(responseObj);
      }
    })
    .catch(function (err) {
      res.status(400).json(err.errors);
    });
};

module.exports.getById = function (req, res) {
  Teacher.findById(req.params.teacherId)
    .then(function (teacher) {
      if (!teacher) {
        res.status(404).json({message: "Teacher not found"});
      }
      else {
        res.json({
          "username": teacher.username,
          "lastName": teacher.lastName,
          "firstName": teacher.firstName,
          "email": teacher.email
        });
      }
    })
    .catch(function (err) {
      res.status(400).json(err.errors);
    });
};

module.exports.post = function (req, res) {
  try {
    var newTeacher = Teacher.build({
      username: req.body.username,
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      password: req.body.password,
      email: req.body.email
    });
    newTeacher.save()
      .then(function () {
        res.json(
          {message: "Inserted teacher successfully"});
      })
      .catch(function (err) {
        res.status(400).json(err.errors);
      });
  }
  catch (e) {
    console.log(e);
    res.status(500).json({message: "An error occurred."});
  }
};

module.exports.put = function (req, res) {
  try {
    Teacher.update(
      {
        username: req.body.username,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        email: req.body.email
      },
      {where: {username: req.params.teacherId}})
      .then(function (updated) {
        if (updated > 0) {
          res.json({message: "Teacher updated"});
        }
        else {
          res.status(404).json({message: "Teacher not found"});
        }
      })
      .catch(function (err) {
        res.status(400).json(err.errors);
      });
  }
  catch (e) {
    console.log(e);
    res.status(500).json({message: "An error occurred."})
  }
};

module.exports.updatePassword = function (req, res) {
  try {
    Teacher.update(
      {password: req.body.password},
      {where: {username: req.params.teacherId}})
      .then(function (updated) {
        if (updated > 0) {
          res.json({message: "Teacher password updated"});
        }
        else {
          res.status(404).json({message: "Teacher not found"});
        }
      })
      .catch(function (err) {
        res.status(400).json(err.errors);
      });
  }
  catch (e) {
    console.log(e);
    res.status(500).json({message: "An error occurred."})
  }
};

module.exports.delete = function (req, res) {
  try {
    Teacher.destroy({
        where: {username: req.params.teacherId}
      })
      .then(function (deleteResult) {
        if (deleteResult === 0) {
          res.status(404).json({message: "Teacher doesn't exist."});
        }
        else {
          res.json({message: "Teacher was successfully deleted."});
        }
      })
      .catch(function (err) {
        res.status(400).json(err.errors);
      });
  }
  catch (e) {
    console.log(e);
    res.status(500).json({message: "An error occurred."});
  }
};