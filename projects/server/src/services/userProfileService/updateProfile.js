const { user, sequelize } = require('../../database/models')

const { messages } = require('../../helpers')
const fs = require('fs')

const bodyData = async (body, req, user) => {
  let updateData = {
    name: body.name,
    username: body.username,
    email: body.email,
    phone: body.phone,
    is_verified: body.is_verified,
    id_role: body.id_role
  }
  if (req.file && req.file.path) {
    updateData.avatar = req.file.path
    if (user.avatar && fs.existsSync(user.avatar)) {
      fs.unlinkSync(user.avatar)
    }
  }
  return updateData
}

const updateProfile = async (req, id, body) => {
  try {
    const userLogin = await user.findOne({
      where: { id }
    })
    if (!userLogin) return messages.error(404, 'User not found')

    const updateData = await bodyData(body, req, userLogin)
    return await sequelize.transaction(async (t) => {
      await user.update(updateData, { where: { id }, transaction: t })
      return messages.success('Profile updated successfully')
    })
  } catch (error) {
    console.log(error)
    return messages.error(500, error.message || 'Internal server error.')
  }
}

module.exports = updateProfile