const { register } = require("../authService");
const { messages } = require("../../helpers");

async function addAdmin(access, attributes) {
  // Check if super admin
  console.log("SINI ERROR");
  if (access !== "admin") messages.error(401, "Unauthorized Request");
  // Register new admin
  return await register(attributes);
}

module.exports = addAdmin;
