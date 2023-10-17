const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { messages } = require("../../helpers");
const db = require("../../database");
require("dotenv").config({
  path: path.resolve(__dirname, "../../../.env"),
});

const users = db["user"];
const roles = db["role"];
const JWT_KEY = process.env.JWT_KEY;

async function findUser(identifier) {
  const user = await users.findOne({
    include: [{ model: roles, attributes: ["name"] }],
    where: { [Op.or]: { username: identifier, email: identifier } },
  });
  return user;
}

async function login(identifier, password) {
  // Check if account exist
  const account = await findUser(identifier);
  if (!account) return messages.error(404, "Account not found");

  // Check Password
  const compared = await bcrypt.compare(password, account["password"]);
  if (!compared) return messages.error(400, "Wrong password");

  const payload = { id: account["id"], role: account["role"]["name"] };
  const token = jwt.sign(payload, JWT_KEY);

  return messages.success("Login success", { token });
}

module.exports = login;
