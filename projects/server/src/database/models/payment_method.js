"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class payment_method extends Model {
    static associate(models) {
      this.hasMany(models["transaction_payment"], {
        foreignKey: "id_payment_method",
      });
    }
  }
  payment_method.init(
    {
      name: DataTypes.STRING,
      identifier: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "payment_method",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return payment_method;
};
