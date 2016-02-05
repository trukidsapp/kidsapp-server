'use stict';

module.exports = function(sequelize, DataTypes) {
  var Answer = sequelize.define("Answer", {
    isCorrect : {
      type : DataTypes.BOOLEAN,
      allowNull : false
    },
    answerText : {
      type : DataTypes.STRING,
      allowNull : false
    }
  }, {
    timestamps : false,
    classMethods : {
      associate : function (models) {
        Answer.belongsTo(models.Question);
      }
    }

  });

  return Answer;
};