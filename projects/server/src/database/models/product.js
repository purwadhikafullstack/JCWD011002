"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    static associate(models) {
      this.hasMany(models.stock_history, { foreignKey: "id_product" });
      this.hasMany(models.cart_product, { foreignKey: "id_product" });
      this.hasMany(models.transaction_product, {
        foreignKey: "id_product",
      });
      this.hasMany(models.product_warehouse, { foreignKey: "id_product" });
      this.belongsTo(models.category, {as: "_category" ,foreignKey: "id_category" });
    }
  }
  product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.BIGINT,
      image: {
        type: DataTypes.STRING,
        unique: true,
      },
      description: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
      id_category: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "product",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [{ unique: true, fields: ["image"] }],
    }
  );
  return product;
};
