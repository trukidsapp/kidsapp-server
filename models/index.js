'use strict';

/*
 generated with the sequelize CLI.
 collects all the models from the models directory and associates them if needed.
 */

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var db        = {};

var database = process.env.KIDSAPPDBNAME;
var user = process.env.KIDSAPPDBUSER;
var password = process.env.KIDSAPPDBPW;
var dbhost = process.env.KIDSAPPDBHOST;
var dbport = process.env.KIDSAPPDBPORT;

var sequelize = new Sequelize(database, user, password, {
  dialect : 'postgres',
  host : dbhost,
  port : dbport
});

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
