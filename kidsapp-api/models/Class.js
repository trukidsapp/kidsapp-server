'use strict';

module.exports = function (sequelize, DataTypes) {
  var Class = sequelize.define("Class", {
    classId : {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    className : {
      type : DataTypes.STRING,
      allowNull : false
    },
    grade : {
      type : DataTypes.STRING,
      allowNull : false
    }
  }, {
    timestamps : false,
    classMethods : {
      associate : function (models) {
        Class.belongsTo(models.Teacher);
        Class.hasMany(models.Student);
      }
    }

  });

  return Class;

};