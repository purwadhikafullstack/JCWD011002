"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class temp_token extends Model {
    static associate(models) {}
  }
  temp_token.init(
    {
      token: { type: DataTypes.STRING, unique: true },
    },
    {
      sequelize,
      modelName: "temp_token",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [{ unique: true, fields: ["token"] }],
    }
  );
  return temp_token;
};
