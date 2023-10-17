const bcrypt = require("bcrypt");
const { messages } = require("../../helpers");
const db = require("../../database");

const users = db["user"];

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function registration(id, attributes) {
  // Check if already verified
  const user = await users.findOne({ where: { id } });
  if (user["is_verified"]) return messages.error(500, "Link already expired");

  // Hashing Password
  attributes["password"] = await hashPassword(attributes["password"]);
  attributes["is_verified"] = true;
  attributes["is_active"] = true;

  // Update user data
  return await db.sequelize.transaction(async function (t) {
    await users.update(attributes, { where: { id }, transaction: t });
    return messages.success("Registration is successful");
  });
}

module.exports = registration;
