const { messages } = require("../helpers");
const { adminService } = require("../services");

async function getWarehouses(req, res) {
  try {
    const result = await adminService.getWarehouses();
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getWarehouses,
};
