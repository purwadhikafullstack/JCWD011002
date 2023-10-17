"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product_warehouse extends Model {
    static associate(models) {
      this.belongsTo(models.warehouse, { foreignKey: "id_warehouse" });
      this.belongsTo(models.product, { foreignKey: "id_product" });
    }
  }
  product_warehouse.init(
    {
      id_warehouse: DataTypes.INTEGER,
      id_product: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "product_warehouse",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return product_warehouse;
};
