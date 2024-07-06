'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    static associate(models) {
      roles.hasMany(models.users, { foreignKey: 'role_id' });
      roles.belongsToMany(models.permissions, {
        through: models.role_permission_mapping,
        foreignKey: 'role_id'
      });
    }
  }

  roles.init({
    role_name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'roles',
    tableName: 'roles',
    paranoid: true,
    deletedAt: 'deleted_at',
  });

  return roles;
};