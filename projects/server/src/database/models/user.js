"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      this.belongsTo(models.role, {
        foreignKey: "id_role",
      });
      this.hasMany(models.user_address, {
        foreignKey: "id_user",
      });
      this.hasOne(models.admin, {
        foreignKey: "id_user",
      });
      this.hasMany(models.stock_history, { foreignKey: "id_user" });
      this.hasOne(models.cart, { foreignKey: "id_user" });
      this.hasMany(models.transaction, { foreignKey: "id_user" });
    }
  }
  user.init(
    {
      name: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        unique: true,
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      avatar: {
        type: DataTypes.STRING,
        unique: true,
      },
      id_role: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [
        { unique: true, fields: ["username"] },
        { unique: true, fields: ["email"] },
        { unique: true, fields: ["phone"] },
        { unique: true, fields: ["avatar"] },
      ],
    }
  );
  return user;
};
