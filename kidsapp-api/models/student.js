'use strict';

module.exports = function (sequelize, DataTypes) {
  var Student = sequelize.define("Student", {
    username : {
      type : DataTypes.STRING,
      allowNull : false
    },
    lastName : {
      type : DataTypes.STRING,
      allowNull : false
    },
    firstName : {
      type : DataTypes.STRING,
      allowNull : false
    },
    password : {
      type : DataTypes.STRING,
      allowNull : false
    }
  }, {
    timestamps : false,
    classMethods : {
      associate : function (models) {
        Student.belongsTo(models.Class);
      }
    }

  });

  return Student;

};