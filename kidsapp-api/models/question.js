module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define("Question", {
    subject : {
      type : DataTypes.STRING,
      allowNull : false
    },
    difficulty : {
      type : DataTypes.STRING,
      allowNull : false
    },
    hint : {
      type : DataTypes.STRING,
      allowNull : false
    },
    type : {
      type : DataTypes.STRING,
      allowNull : false
    },
    text : {
      type : DataTypes.STRING,
      allowNull : false
    }
  }, {
    timestamps : false,
    classMethods : {
      associate : function (models) {
        Question.belongsToMany(models.Quiz, {
          through : 'QuizQuestion',
          timestamps : false
        });

       Question.hasMany(models.Answer);

       Question.hasMany(models.QuestionResult);


      }
    }

  });

  return Question;
};