'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admin extends Model {
    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: 'id_user'
      })
      this.belongsTo(models.warehouse, {
        foreignKey: 'id_warehouse'
      })
    }
  }
  admin.init({
    id_user: DataTypes.INTEGER,
    id_warehouse: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'admin',
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  return admin;
};