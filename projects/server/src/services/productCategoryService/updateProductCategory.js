const { category, sequelize } = require('../../database/models');
const { messages } = require('../../helpers');
const {Op} = require('sequelize');

const updateProductCategory = async (id, body, req) => {
  try {
    if (body.name) {
      const isCategoryExist = await category.findOne({
        where: {
          name: body.name,
          id: { [Op.not]: id }
        }
      })
      if (isCategoryExist) {
        return messages.error(409, 'Category already exist');
      }
    }
    let updateData = {
      name: body.name,
    }
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
      return messages.success('successfully updated product category', body);
    })
  } catch (error) {
    console.log(error);
    return messages.error(500, error.message);
  }
}

module.exports = updateProductCategory