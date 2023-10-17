"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class stock_history extends Model {
    static associate(models) {
      this.belongsTo(models.product, { foreignKey: "id_product" });
      this.belongsTo(models.user, { foreignKey: "id_user" });
      this.belongsTo(models.warehouse, { foreignKey: "id_warehouse_from" });
      this.belongsTo(models.warehouse, { foreignKey: "id_warehouse_to" });
      this.belongsTo(models.transaction, { foreignKey: "id_transaction" });
      this.belongsTo(models.status, { foreignKey: "id_status" });
    }
  }
  stock_history.init(
    {
      id_user: DataTypes.INTEGER,
      id_warehouse_from: DataTypes.INTEGER,
      id_warehouse_to: DataTypes.INTEGER,
      id_product: DataTypes.INTEGER,
      id_transaction: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      id_status: DataTypes.INTEGER,
      last_stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "stock_history",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return stock_history;
};
