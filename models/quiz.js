'use strict';

module.exports = function (sequelize, DataTypes) {
  var Quiz = sequelize.define("Quiz", {
    quizName : {
      type : DataTypes.STRING,
      allowNull : false
    },
    gradeLevel : {
      type : DataTypes.INTEGER,
      allowNull : false
    }
  }, {
    timestamps : false,
    classMethods : {
      associate : function (models) {
        Quiz.belongsToMany(models.Class, {
          through : 'QuizClass',
          timestamps : false
        });
        Quiz.belongsToMany(models.Question,{
          through: 'QuizQuestion',
          timestamps : false
        });
      }
    }

  });

  return Quiz;

};