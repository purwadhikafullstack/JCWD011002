const { category, sequelize } = require('../../database/models');
const { messages } = require('../../helpers');

const createProductCategory = async (body, req) => {
  try {
    const image = req.file.path
    const isCategoryExist = await category.findOne({
      where: {
        name: body.name,
      },
    })
    if (isCategoryExist) {
      return messages.error(409, 'Category already exist');
    }

    return await sequelize.transaction(async (t) => {
      const newCategory = await category.create({
        name: body.name,
        image: image
      }, { transaction: t });
      return messages.success('successfully created product category', newCategory);
    })
  } catch (error) {
    console.log(error);
  }
}

module.exports = createProductCategory