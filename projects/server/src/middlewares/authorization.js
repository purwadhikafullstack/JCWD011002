const db = require("../database");

const users = db["user"];
const roles = db["role"];

async function getRole(id) {
  const user = await users.findOne({ where: { id } });
  const role = await roles.findOne({ where: { id: user["id_role"] } });
  return role["name"];
}

async function authorization(req, res, next) {
  try {
    const { id } = req.account;
    // For checking user role
    const role = await getRole(id);
    // Block user
    if (role === "user")
      return res.status(401).json({ message: "Not Authourized" });
    // Pass admin - Checking role level
    req.access = role;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = authorization;
