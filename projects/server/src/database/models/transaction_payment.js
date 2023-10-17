"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaction_payment extends Model {
    static associate(models) {
      this.belongsTo(models["transaction"], { foreignKey: "id_transaction" });
      this.belongsTo(models["payment_method"], {
        foreignKey: "id_payment_method",
      });
      this.belongsTo(models["status"], { foreignKey: "id_status" });
    }
  }
  transaction_payment.init(
    {
      id_transaction: DataTypes.INTEGER,
      id_payment_method: DataTypes.INTEGER,
      receipt: { type: DataTypes.STRING, unique: true },
      id_status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "transaction_payment",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [{ unique: true, fields: ["receipt"] }],
    }
  );
  return transaction_payment;
};
