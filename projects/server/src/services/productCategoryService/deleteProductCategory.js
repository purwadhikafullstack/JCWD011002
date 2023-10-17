const {category, sequelize} = require('../../database/models');
const {messages} = require('../../helpers');

const deleteProductCategory = async (id) => {
  try {
    const result = await category.destroy({where: {id}});
    return messages.success('successfully deleted product category', result);
  } catch (error) {
    console.log(error);
    return messages.error(500, error.message);
  }
}

module.exports = deleteProductCategory