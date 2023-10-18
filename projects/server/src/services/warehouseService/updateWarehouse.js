const { warehouse, sequelize } = require('../../database/models')
const { messages } = require('../../helpers')
const getLatLongFromAddress = require('../../helpers/addressCoordinate')

const updateWarehouse = async (id, body) => {
  try {
    const existingWarehouse = await warehouse.findOne({
      where: { id: id },
    })
    if (!existingWarehouse) {
      return messages.error(404, 'Gudang tidak ditemukan')
    }
    const { latitude, longitude } = await getLatLongFromAddress(body.province, body.city_name)
    const updateWarehouse = await sequelize.transaction(async (t) => {
      await existingWarehouse.update({
        name: body.name,
        address: body.address,
        province: body.province,
        city_name: body.city_name,
        postal_code: body.postal_code,
        latitude,
        longitude,
      }, { transaction: t })
      return existingWarehouse
    })
    return messages.success('Gudang berhasil diperbarui', updateWarehouse)
  } catch (error) {
    return messages.error(500, error.message);
  }
}

module.exports = updateWarehouse