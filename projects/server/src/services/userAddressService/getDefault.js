const { user_address } = require("../../database");

const getDefault = async (userId) => {
  try {
    const defaultAddress = await user_address.findOne({
      where: { id_user: userId, is_default: true },
    });

    if (!defaultAddress) {
      return { status: 404, message: "Default address not found" };
    }

    return { status: 200, data: defaultAddress };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports = getDefault;
