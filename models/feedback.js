module.exports = function(sequelize, DataTypes) {
    var Feedback = sequelize.define("Feedback", {
        title : {
            type : DataTypes.STRING,
            allowNull : false
        },
        errorCode : {
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
                Feedback.belongsTo(models.Teacher);
            }
        }

    });

    return Feedback;
    
};