const db = require('../database/models');
const UserAddress = db.user_address;
const sequelize = db.sequelize;

const defaultAddressUpdate = async (body, id_user) => {
  const defaultAddress = await UserAddress.findOne({
    where: { is_default: true, id_user: id_user },
  });
  if (defaultAddress && body.is_default) {
    await sequelize.transaction(async (t) => {
      await UserAddress.update({ is_default: false }, {
        where: { is_default: true }
      }, { transaction: t });
    })
  }
}

module.exports = defaultAddressUpdate