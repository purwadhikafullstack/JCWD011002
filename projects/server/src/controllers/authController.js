const { messages } = require("../helpers");
const { authService } = require("../services");

async function register(req, res) {
  try {
    const attributes = req.body;
    const result = await authService.register(attributes);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function registration(req, res) {
  try {
    const { id } = req.account;
    const attributes = req.body;
    const result = await authService.registration(id, attributes);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function login(req, res) {
  try {
    const { identifier, password } = req.body;
    const result = await authService.login(identifier, password);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function keepLogin(req, res) {
  try {
    const { id } = req.account;
    const result = await authService.keepLogin(id);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    const result = await authService.forgotPassword(email);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.messsage });
  }
}

async function resetPassword(req, res) {
  try {
    const { token } = req;
    const { id } = req.account;
    const { password } = req.body;
    const result = await authService.resetPassword(token, id, password);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.messsage });
  }
}

module.exports = {
  register,
  registration,
  login,
  keepLogin,
  forgotPassword,
  resetPassword,
};
