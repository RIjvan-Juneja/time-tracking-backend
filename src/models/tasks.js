'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tasks extends Model {
    static associate(models) {
      tasks.belongsTo(models.users, { foreignKey: 'user_id' });
      tasks.belongsTo(models.category, { foreignKey: 'category_id' });
      tasks.hasMany(models.attachments, { foreignKey: 'task_id' });
      tasks.hasMany(models.tasks_time_logs, { foreignKey: 'task_id' });
    }
  }

  tasks.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    category_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'tasks',
    tableName: 'tasks',
    paranoid: true,
    deletedAt: 'deleted_at',
  });

  return tasks;
};