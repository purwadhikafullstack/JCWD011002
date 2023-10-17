const db = require("../../database/models");
const UserAddress = db.user_address;
const { messages } = require("../../helpers");

const getUserAddress = async (id) => {
  const result = await UserAddress.findAll({
    where: { id_user: id },
    include: [{
      model: db.user,
      attributes: ["name", "phone"]
    }]
  });
  if (!result) {
    return messages.error(404, 'Alamat pengguna tidak ditemukan');
  }
  return messages.success('successfully get user address', result)
}

const getUserAddressById = async (id, id_user) => {
  const result = await UserAddress.findOne({
    where: { id: id, id_user: id_user },
    include: [{
      model: db.user,
      attributes: ["name", "phone"]
    }]
  });
  if (!result) {
    return messages.error(404, 'Alamat pengguna tidak ditemukan');
  }
  return messages.success('successfully get user address', result)
}

module.exports = { getUserAddress, getUserAddressById }