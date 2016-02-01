'use stict';

module.exports = function(sequelize, DataTypes) {
  var QuestionResult = sequelize.define("QuestionResult", {
    startTime : {
      type : DataTypes.DATE,
      allowNull : false
    },
    endTime : {
      type : DataTypes.DATE,
      allowNull : false
    },
    isCorrect : {
      type : DataTypes.BOOLEAN,
      allowNull : false
    },
    response : {
      type : DataTypes.STRING
    }
  }, {
    timestamps : false,
    classMethods : {
      associate : function (models) {
        QuestionResult.belongsTo(models.Question);
        QuestionResult.belongsTo(models.Student);
      }
    }

  });

  return QuestionResult;
};