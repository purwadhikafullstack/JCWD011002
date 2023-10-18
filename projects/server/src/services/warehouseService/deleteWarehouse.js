const { warehouse } = require('../../database/models')
const { messages } = require('../../helpers')

const deleteWarehouse = async (id) => {
  try {
    const existingWarehouse = await warehouse.findOne({
      where: { id: id },
    })
    if (!existingWarehouse) {
      return messages.error(404, 'Gudang tidak ditemukan')
    }
    await existingWarehouse.destroy();
    return messages.success('Gudang berhasil dihapus', {})
  } catch (error) {
    return messages.error(500, error.message);
  }
}

module.exports = deleteWarehouse