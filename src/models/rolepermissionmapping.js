'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role_permission_mapping extends Model {
    static associate(models) {
      role_permission_mapping.belongsTo(models.roles, { foreignKey: 'role_id' });
      role_permission_mapping.belongsTo(models.permissions, { foreignKey: 'permission_id' });
    }
  }

  role_permission_mapping.init({
    role_id: DataTypes.INTEGER,
    permission_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'role_permission_mapping',
    tableName: 'role_permission_mapping',
    paranoid: true,
    deletedAt: 'deleted_at',
  });

  return role_permission_mapping;
};