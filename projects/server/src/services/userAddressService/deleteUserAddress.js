const db = require('../../database/models');
const UserAddress = db.user_address;
const { messages } = require('../../helpers');

const deleteUserAddress = async (addressId) => {
  try {
    const existingAddress = await UserAddress.findOne({
      where: { id: addressId },
    });

    if (!existingAddress) {
      return messages.error(404, 'Alamat pengguna tidak ditemukan');
    }
    await existingAddress.destroy();
    return messages.success('Alamat pengguna berhasil dihapus', {});
  } catch (error) {
    return messages.error(500, error.message);
  }
};

module.exports = deleteUserAddress
