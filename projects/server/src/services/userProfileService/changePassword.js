const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { user, sequelize } = require("../../database/models");
const { messages } = require("../../helpers");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

const checkPassword = async (body, userLogin) => {
  let password = userLogin.password;
  if (body.current_password && body.new_password && body.confirm_password) {
    if (body.new_password !== body.confirm_password) {
      throw new Error('password not match');
    }
    const currentPassword = await bcrypt.compare(body.current_password, userLogin.password)
    if (!currentPassword) {
      throw new Error('Wrong password');
    }
    password = await hashPassword(body.new_password)
  }
  return password;
}
const changePassword = async (id, body) => {
  try {
    const userLogin = await user.findOne({
      where: { id }
    })
    if (!userLogin) return messages.error(404, 'User not found')
    const password = await checkPassword(body, userLogin)
    return await sequelize.transaction(async (t) => {
      await user.update({ password: password }, { where: { id }, transaction: t })
      return messages.success('Password updated successfully')
    })
  } catch (error) {
    console.log(error)
    return messages.error(500, error.message || 'Internal server error.')
  }
}

module.exports = changePassword