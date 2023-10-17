const bcrypt = require("bcrypt");
const db = require("../../database");
const { messages } = require("../../helpers");

const users = db["user"];
const temp_tokens = db["temp_token"];

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function resetPassword(token, id, password) {
  // Check if token have been used
  const isExist = await temp_tokens.findOne({ where: { token } });
  if (!isExist) return messages.error(400, "Link had been used");

  // Update password
  password = await hashPassword(password);
  return await db.sequelize.transaction(async function (t) {
    await temp_tokens.destroy({ where: { token } });
    await users.update({ password }, { where: { id }, transaction: t });
    return messages.success("Password successfully reseted");
  });
}

module.exports = resetPassword;
