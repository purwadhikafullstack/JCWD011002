"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    static associate(models) {
      this.belongsTo(models["user"], { foreignKey: "id_user" });
      this.hasMany(models["cart_product"], { foreignKey: "id_cart" });
    }
  }
  cart.init(
    {
      id_user: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "cart",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return cart;
};
