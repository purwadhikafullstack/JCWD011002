const { messages } = require("../helpers");
const { adminService, transactionService } = require("../services");

async function getRoles(req, res) {
  try {
    const result = await adminService.getRoles();
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateAdmin(req, res) {
  try {
    const { access } = req;
    const { id } = req.params;
    const attributes = req.body;
    const result = await adminService.updateAdmin(access, id, attributes);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAdmin(req, res) {
  try {
    const { id } = req.account;
    const result = await adminService.getAdmin(id);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function addAdmin(req, res) {
  try {
    const { access } = req;
    const attributes = req.body;
    const result = await adminService.addAdmin(access, attributes);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getTransactions(req, res) {
  try {
    const { access, query } = req;
    const result = await transactionService.getTransactions(access, query);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const {id} = req.params;
    const {status} = req.body;
    const result = await transactionService.updateOrderStatus(id, status);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getRoles,
  updateAdmin,
  getAdmin,
  addAdmin,
  getTransactions,
  updateOrderStatus,
};
