const { category, sequelize } = require('../../database/models');
const { messages } = require('../../helpers');

const updateProductCategory = async (id, body) => {
  try {
    console.log("body", body.name)
    return await sequelize.transaction(async (t) => {
      await category.update(
        {
          name: body.name,
        },
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