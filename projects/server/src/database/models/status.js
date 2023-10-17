"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class status extends Model {
    static associate(models) {
      this.hasMany(models.stock_history, {
        foreignKey: "id_status",
      });
      this.hasMany(models.transaction, {
        foreignKey: "id_status",
      });
      this.hasMany(models.transaction_payment, {
        foreignKey: "id_status",
      });
    }
  }
  status.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "status",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return status;
};