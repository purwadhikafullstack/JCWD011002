const db = require('../../database/models');
const UserAddress = db.user_address;
const sequelize = db.sequelize;
const { messages } = require('../../helpers');
const getLatLongFromAddress = require('../../helpers/addressCoordinate');
const defaultAddressUpdate = require('../../helpers/defaultAddressUpdate');

const updateUserAddress = async (addressId, body, id_user) => {
  try {
    const existingAddress = await UserAddress.findOne({
      where: { id: addressId },
    });
    if (!existingAddress) {
      return messages.error(404, 'Alamat pengguna tidak ditemukan');
    }
    await defaultAddressUpdate(body, id_user);
    const { latitude, longitude } = await getLatLongFromAddress(body.province, body.city_name);

    const updatedAddress = await sequelize.transaction(async (t) => {
      await existingAddress.update(
        {
          name: body.name,
          province: body.province,
          city_name: body.city_name,
          postal_code: body.postal_code,
          full_address: body.full_address,
          is_default: body.is_default || false,
          latitude,
          longitude,
        },
        { transaction: t }
      );
      return existingAddress; b
    });

    return messages.success('Alamat pengguna berhasil diperbarui', updatedAddress);
  } catch (error) {
    console.log(error);
    return messages.error(500, error.message);
  }
};

module.exports = updateUserAddress
