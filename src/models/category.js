'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    static associate(models) {
      category.hasMany(models.tasks, { foreignKey: 'category_id' });
    }
  }

  category.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'category',
    tableName: 'category',
    paranoid: true,
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return category;
};