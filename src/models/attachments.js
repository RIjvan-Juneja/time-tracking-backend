'use strict';
const {
  Model,
  INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attachments extends Model {
    static associate(models) {
      attachments.belongsTo(models.tasks, { foreignKey: 'task_id' });
    }
  }

  attachments.init({
    task_id: DataTypes.INTEGER,
    file_type: DataTypes.STRING,
    file_name: DataTypes.STRING,
    path: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'attachments',
    tableName: 'attachments',
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: false,
    deletedAt: 'deleted_at',
  });

  return attachments;
};