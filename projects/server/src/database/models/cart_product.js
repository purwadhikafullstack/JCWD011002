"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class cart_product extends Model {
    static associate(models) {
      this.belongsTo(models["cart"], { foreignKey: "id_cart" });
      this.belongsTo(models["product"], { foreignKey: "id_product" });
    }
  }
  cart_product.init(
    {
      id_cart: DataTypes.INTEGER,
      id_product: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "cart_product",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return cart_product;
};
