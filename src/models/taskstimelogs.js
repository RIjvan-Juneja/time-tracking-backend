'use strict';
const {
  Model,
  INET,
  INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tasks_time_logs extends Model {
    static associate(models) {
      tasks_time_logs.belongsTo(models.tasks, { foreignKey: 'task_id' });
      tasks_time_logs.belongsTo(models.users, { foreignKey: 'user_id' });
    }
  }

  tasks_time_logs.init({
    task_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    start_datetime: DataTypes.DATE,
    end_datetime: DataTypes.DATE,
    duration: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'tasks_time_logs',
    tableName: 'tasks_time_logs',
    paranoid: true,
    deletedAt: 'deleted_at',
  });

  return tasks_time_logs;
};