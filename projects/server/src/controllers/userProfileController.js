const { messages } = require("../helpers");
const { userProfileService, adminService } = require("../services");

const getUser = async (req, res) => {
  try {
    const { id } = req.account;
    const result = await userProfileService.getUser(id);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { id } = req.account;
    const {
      name,
      username,
      email,
      phone,
      current_password,
      new_password,
      confirm_password,
      is_verified,
      id_role,
    } = req.body;
    const body = {
      name,
      username,
      email,
      phone,
      current_password,
      new_password,
      confirm_password,
      is_verified,
      id_role,
    };
    const result = await userProfileService.updateProfile(req, id, body);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { id } = req.account;
    const { current_password, new_password, confirm_password } = req.body;
    const body = { current_password, new_password, confirm_password };
    const result = await userProfileService.changePassword(id, body);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function getUsers(req, res) {
  try {
    const { id } = req.account;
    const { access, query } = req;
    const result = await adminService.getUsers(access, id, query);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.messsage });
  }
}

module.exports = {
  getUser,
  getUsers,
  updateProfile,
  changePassword,
};
