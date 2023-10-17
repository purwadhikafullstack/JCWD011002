const { Op } = require("sequelize");
const db = require("../../database");
const { messages } = require("../../helpers");

const roles = db["role"];

async function getRoles() {
  const result = await roles.findAll({ where: { name: { [Op.not]: "user" } } });
  return messages.success("", result);
}

module.exports = getRoles;
