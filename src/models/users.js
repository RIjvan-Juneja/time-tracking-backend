'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      users.belongsTo(models.roles, { foreignKey: 'role_id' });
      users.hasMany(models.tasks, { foreignKey: 'user_id' });
      users.hasMany(models.tasks_time_logs, { foreignKey: 'user_id' });
    }
  }

  users.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    mobile_number: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'users',
    tableName: 'users',
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });

  return users;
};