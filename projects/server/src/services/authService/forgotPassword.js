const path = require("path");
const db = require("../../database");
const jwt = require("jsonwebtoken");
const { messages, mailer } = require("../../helpers");
require("dotenv").config({
  path: path.resolve(__dirname, "../../../.env"),
});

const users = db["user"];
const temp_tokens = db["temp_token"];
const FE_URL = process.env.WHITELISTED_DOMAIN;
const JWT_KEY = process.env.JWT_KEY;

async function sendMail(email, payload) {
  const subject = "Reset Password";
  // Create token
  const token = jwt.sign(payload, JWT_KEY, { expiresIn: "4h" });
  await db.sequelize.transaction(async function (t) {
    await temp_tokens.create({ token }, { transaction: t });
  });
  const redirect = `${FE_URL}/reset/${token}`;
  // Send Mail
  await mailer.send("reset", email, subject, { redirect });
}

async function forgotPassword(email) {
  // Check if user is exist
  const user = await users.findOne({ where: { email } });
  if (!user) return messages.error(404, "Email is not registered");

  // Send Email to change password
  await sendMail(email, { id: user["id"] });
  return messages.success("Please check your email to reset your password");
}

module.exports = forgotPassword;
