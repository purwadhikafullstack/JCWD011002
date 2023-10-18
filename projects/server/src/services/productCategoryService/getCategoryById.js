const { category, sequelize } = require('../../database/models');
const { messages } = require('../../helpers');

const getCategoryById = async (id) => {
  try {
    const result = await category.findByPk(id);
    return messages.success('successfully get category', result);
  } catch (error) {
    console.log(error);
    return messages.error(500, error.message);
  }
}

module.exports = getCategoryById