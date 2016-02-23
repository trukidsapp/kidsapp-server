var Teacher = require('../models').Teacher;

// get all teachers
module.exports.get = function (req, res) {
  console.log("Inside of teacher route");
  console.log(req.params.id);
  if (req.params.id != null) {
    Teacher.findOne({
      //include: [ models.Teacher ]
      where: {
        username: req.params.id.substring(1)//Teacher
      }
    }).then(function (foundTeacher) {
      res.json(foundTeacher);
    });
  }
  else {
    Teacher.findAll({
      //include: [ models.Teacher ]
    }).then(function (Teachers) {
      res.json(Teachers);
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
        where:{username:req.params.id.substring(1)}
      })
      .then(function(){
        res.json({message: "Teacher updated."});
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
    Teacher.destroy({
      where: {username: req.params.id.substring(1)}
    }).then(function (error) {
      if (error == 0)
        res.json({message: "Teacher doesn't exist."});
      else
        res.json({message: "Teacher was successfully deleted."})
    });
  }
  catch(e){
    console.log(e);
    res.status(400).json({message: "An error occurred."})
  }
};