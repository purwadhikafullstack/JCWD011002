const { warehouse, sequelize } = require('../../database/models')
const { messages } = require('../../helpers')
const getLatLongFromAddress = require('../../helpers/addressCoordinate')

const createWarehouse = async (body) => {
  try {
    const { latitude, longitude } = await getLatLongFromAddress(body.province, body.city_name);
    return await sequelize.transaction(async (t) => {
      const newWarehouse = await warehouse.create({
        name: body.name,
        address: body.address,
        province: body.province,
        city_name: body.city_name,
        postal_code: body.postal_code,
        latitude,
        longitude,
      }, { transaction: t });
      return messages.success('successfully created warehouse', newWarehouse);
    })
  } catch (error) {
    return messages.error(500, error.message);
  }
}

module.exports = createWarehouse