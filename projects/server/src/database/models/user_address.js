"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_address extends Model {
    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: "id_user",
      });
    }
  }
  user_address.init(
    {
      id_user: DataTypes.INTEGER,
      name: DataTypes.STRING,
      province: DataTypes.STRING,
      city_name: DataTypes.STRING,
      postal_code: DataTypes.INTEGER,
      full_address: DataTypes.STRING,
      is_default: DataTypes.BOOLEAN,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user_address",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return user_address;
};
