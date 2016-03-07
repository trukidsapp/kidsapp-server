module.exports = function(sequelize, DataTypes) {
  var Result = sequelize.define("Result", {
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
        Result.belongsTo(models.Question);
        Result.belongsTo(models.Student);
      }
    }
  });
  return Result;
};