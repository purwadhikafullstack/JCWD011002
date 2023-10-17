const path = require("path");
const jwt = require("jsonwebtoken");
const { messages } = require("../../helpers");
require("dotenv").config({
  path: path.resolve(__dirname, "../../../.env"),
});

const JWT_KEY = process.env.JWT_KEY;

async function keepLogin(id) {
  const payload = { id };
  const token = jwt.sign(payload, JWT_KEY, { expiresIn: "1hr" });
  return messages.success("Token has been updated", { token });
}

module.exports = keepLogin;
