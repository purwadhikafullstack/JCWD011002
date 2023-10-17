const db = require('../../database/models');
const UserAddress = db.user_address;
const sequelize = db.sequelize;
const { messages } = require('../../helpers');
const getLatLongFromAddress = require('../../helpers/addressCoordinate');
const defaultAddressUpdate = require('../../helpers/defaultAddressUpdate');

const createUserAddress = async (id, body, id_user) => {
  try {
    await defaultAddressUpdate(body, id_user);
    const { latitude, longitude } = await getLatLongFromAddress(body.province, body.city_name);

    return await sequelize.transaction(async (t) => {
      const newAddress = await UserAddress.create({
        id_user: id,
        name: body.name,
        province: body.province,
        city_name: body.city_name,
        postal_code: body.postal_code,
        full_address: body.full_address,
        is_default: body.is_default || false,
        latitude,
        longitude,
      }, { transaction: t });
      return messages.success('successfully created user address', newAddress);
    })
  } catch (error) {
    return messages.error(500, error.message);
  }
};

module.exports = createUserAddress
