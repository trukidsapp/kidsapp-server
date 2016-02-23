var Teacher = require('../models').Teacher;

// get teachers, all and by id
module.exports.get = function (req, res) {
  if (req.params.id) {
    Teacher.findOne({
      where: {
        username: req.params.id//Teacher
      }
    }).then(function (foundTeacher) {
      if (foundTeacher == null) {
        res.status(404).json({message: "teacher not found"});
      }
      else {
        // TODO only return fields we need? password?
        res.json(foundTeacher);
      }
    });
  }
  else {
    Teacher.findAll({
    }).then(function (foundTeachers) {
      if (foundTeachers.length === 0) {
        res.status(404).json({message: "no teachers found"});
      }
      else {
        // TODO only return fields we need? password?
        res.json(foundTeachers);
      }
    });
  }
};

// create a Teacher
module.exports.post = function (req, res) {
  try {
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
          {message: "Inserted Teacher successfully"});
      })
      .error(function (err) {
        console.log(err);
        res.status(400).json({message: "Invalid Teacher format"});
      });
  }
  catch (e) {
    console.log(e);
    res.status(400).json({message: "Invalid Teacher format"});
  }
};

module.exports.put = function (req, res) {
  try{
    Teacher.update(
      {
        username : req.body.username,
        lastName : req.body.lastName,
        firstName : req.body.firstName,
        password : req.body.password,
        email : req.body.email
      },
      {
        where:{username:req.params.id}
      })
      .then(function(updated){
        if (updated > 0) {
          res.json({message: "Student updated"});
        }
        else {
          res.status(404).json({message:"Student not found"});
        }
      }).error(function(err) {
      throw err;
      });
  }
  catch(e){
    console.log(e);
    res.status(500).json({message: "An error occurred."})
  }
};
module.exports.delete = function (req, res) {
  try {
    Teacher.destroy({
      where: {username: req.params.id}
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