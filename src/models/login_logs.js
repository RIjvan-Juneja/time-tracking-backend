'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class login_logs extends Model {
    static associate(models) {
    }
  }
  login_logs.init({
    email: DataTypes.STRING,
    status : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'login_logs',
  });
  return login_logs;
};