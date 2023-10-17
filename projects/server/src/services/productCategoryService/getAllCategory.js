const { category, sequelize } = require('../../database/models');
const { messages } = require('../../helpers');

const getAllCategory = async () => {
  try {
    const result = await category.findAll();
    return messages.success('successfully get all category', result);
  } catch (error) {
    console.log(error);
    return messages.error(500, error.message);
  }
}

module.exports = getAllCategory