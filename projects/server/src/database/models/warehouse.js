"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class warehouse extends Model {
    static associate(models) {
      this.hasMany(models.product_warehouse, { foreignKey: "id_warehouse" });
      this.hasMany(models.admin, { foreignKey: "id_warehouse" });
      this.hasMany(models.stock_history, { foreignKey: "id_warehouse_from" });
      this.hasMany(models.stock_history, { foreignKey: "id_warehouse_to" });
    }
  }
  warehouse.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      province: DataTypes.STRING,
      city_name: DataTypes.STRING,
      postal_code: DataTypes.INTEGER,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "warehouse",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return warehouse;
};
