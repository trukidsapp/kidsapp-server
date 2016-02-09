/**
 * Created by darkhobbo on 2/8/2016.
 */
'use strict';

var Class = require('../models').Class;

// get all classes
module.exports.get = function(req, res) {
    Class.findAll({
        //include: [ models.Class ]
    }).then(function(classes) {
        res.json(classes);
    });

};

// create a Class
module.exports.post = function(req, res) {
    try {
        var newClassName = req.body.className;
        var newGrade = req.body.grade;

        var newClass = Class.build({
            className: newClassName,
            grade: newGrade
        });
        /*
        console.log("Inside post.");
        console.log("Class Name: " + newClassName);
        console.log("Grade: " + newGrade);*/

        if(newClassName == null || newGrade == null)
        {
            console.log("Null values received.");
            res.json({message: "Null values received."})
        }
        else{
            newClass.save()
                .then(function () {
                    res.json(
                        {message: "Inserted class successfully"});
                })
                .error(function (err) {
                    console.log(err);
                    res.status(400).json({message: "Invalid class format"});
                });
        }
    }
    catch(e) {
        console.log(e);
        res.status(400).json({message: "Invalid class format"});
    }
};