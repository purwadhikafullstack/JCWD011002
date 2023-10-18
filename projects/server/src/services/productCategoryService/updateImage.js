const {category, sequelize} = require('../../database/models');
const {messages} = require('../../helpers');

const updateImage = async (id, req) => {
  try {
    let updateData = {}
    if (req.file && req.file.path) {
      updateData.image = req.file.path;

      if (category.image && fs.existsSync(category.image)) {
        fs.unlinkSync(category.image);
      }
    }
    return await sequelize.transaction(async (t) => {
      await category.update(
        updateData,
        { where: { id }, transaction: t }
      );
      return messages.success('successfully updated product category', updateData);
    })
  } catch (error) {
    console.log(error);
  }
}

module.exports = updateImage