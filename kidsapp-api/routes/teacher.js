var Teacher = require('../models').Teacher;

// get teachers, all and by id
module.exports.getAll = function (req, res) {
  Teacher.findAll({
  }).then(function (teachers) {
    if (teachers.length === 0) {
      res.status(404).json({message: "No teachers found"});
    }
    else {
      var responseObj = [];
      teachers.forEach(function(val, i, teachers){
        responseObj.push({
          username : teachers[i].dataValues.username,
          lastName : teachers[i].dataValues.lastName,
          firstName : teachers[i].dataValues.firstName,
          email : teachers[i].dataValues.email
        })
      });
      res.json(responseObj);
    }
  });
};

module.exports.getById = function (req, res) {
  Teacher.findOne({
    where: {
      username: req.params.teacherId//Teacher
    }
  }).then(function (teacher) {
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
  });
};

// create a Teacher
module.exports.post = function (req, res) {
  try {
    if(!req.body.username || !req.body.lastName || !req.body.firstName || !req.body.password || !req.body.email ) {
      res.status(400).json({message: "Invalid teacher request format."});
    }
    else{
      var newTeacher = Teacher.build({
        username : req.body.username,
        lastName : req.body.lastName,
        firstName : req.body.firstName,
        password : req.body.password,
        email : req.body.email
      });
      newTeacher.save()
        .then(function () {
          res.json(
            {message: "Inserted teacher successfully"});
        })
        .error(function (err) {
          console.log(err);
          res.status(400).json({message: "Invalid teacher format"});
        });
    }
  }
  catch (e) {
    console.log(e);
    res.status(500).json({message: "An error occurred."});
  }
};

module.exports.put = function (req, res) {
  try{
    if(!req.body.username || !req.body.lastName || !req.body.firstName || !req.body.email) {
      res.status(400).json({message: "Invalid teacher request format."});
    }
    else{
      Teacher.update(
        {
          username : req.body.username,
          lastName : req.body.lastName,
          firstName : req.body.firstName,
          email : req.body.email
        },
        {
          where:{username:req.params.teacherId}
        })
        .then(function(updated){
          if (updated > 0) {
            res.json({message: "Teacher updated"});
          }
          else {
            res.status(404).json({message:"Teacher not found"});
          }
        }).error(function(err) {
        throw err;
      });
    }
  }
  catch(e){
    console.log(e);
    res.status(500).json({message: "An error occurred."})
  }
};

module.exports.updatePassword = function (req, res) {
  try{
    if(!req.body.password) {
      res.status(400).json({message: "Invalid teacher request format."});
    }
    else{
      Teacher.update(
        {
          password : req.body.password
        },
        {
          where:{username:req.params.teacherId}
        })
        .then(function(updated){
          if (updated > 0) {
            res.json({message: "Teacher password updated"});
          }
          else {
            res.status(404).json({message:"Teacher not found"});
          }
        }).error(function(err) {
        throw err;
      });
    }
  }
  catch(e){
    console.log(e);
    res.status(500).json({message: "An error occurred."})
  }
};

module.exports.delete = function (req, res) {
  try {
    Teacher.destroy({
      where: {username: req.params.teacherId}
    }).then(function (deleteResult) {
      if (deleteResult === 0) {
        res.status(404).json({message: "Teacher doesn't exist."});
      }
      else {
        res.json({message: "Teacher was successfully deleted."});
      }
    });
  }
  catch(e){
    console.log(e);
    res.status(500).json({message: "An error occurred."});
  }
};