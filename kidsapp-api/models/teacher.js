'use strict';

module.exports = function (sequelize, DataTypes) {
  var Teacher = sequelize.define("Teacher", {
    username : {
      type : DataTypes.STRING,
      allowNull : false
    },
    lastName : {
      type : DataTypes.STRING,
      allowNull : false
    },
    firstName: {
      type : DataTypes.STRING,
      allowNull : false
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false
    },
    email : {
      type : DataTypes.STRING,
      allowNull : false
    }
  }, {
    timestamps : false,
    classMethods : {
      associate : function (models) {
        Teacher.hasMany(models.Class);
      }
    }

  });

  return Teacher;

};