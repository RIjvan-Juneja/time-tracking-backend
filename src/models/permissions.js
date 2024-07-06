'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class permissions extends Model {
    static associate(models) {
      permissions.belongsToMany(models.roles, {
        through: models.role_permission_mapping,
        foreignKey: 'permission_id'
      });
    }
  }

  permissions.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'permissions',
    tableName: 'permissions',
    paranoid: true,
    deletedAt: 'deleted_at',
  });

  return permissions;
};