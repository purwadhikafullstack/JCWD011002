"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaction_product extends Model {
    static associate(models) {
      this.belongsTo(models["transaction"], {
        foreignKey: "id_transaction",
      });
      this.belongsTo(models["product"], { foreignKey: "id_product" });
      this.belongsTo(models["product_warehouse"], {
        foreignKey: "id_product",
        targetKey: "id_product",
        as: "productWarehouse",
      });
    }
  }
  transaction_product.init(
    {
      id_transaction: DataTypes.INTEGER,
      id_product: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      price: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: "transaction_product",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return transaction_product;
};
