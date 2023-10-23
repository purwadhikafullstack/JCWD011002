const { category, sequelize } = require('../../database/models');
const { messages } = require('../../helpers');
const { Op } = require('sequelize');
const getAllCategory = async (sort, name, search, page, limit) => {
  try {
    const currentPage = parseInt(page) || 1;
    const itemsPerPage = parseInt(limit) || 10;
    const orderBy = (field, order) => {
      return order === "desc" ? [field, "DESC"] : [field, "ASC"];
    }
    let order = [];
    if (sort === "asc") {
      order.push(orderBy("updated_at", sort));
    } else if (sort === "desc") {
      order.push(orderBy("updated_at", sort));
    } else if (sort === "a-z") {
      order.push(orderBy("name", "asc"));
    } else if (sort === "z-a") {
      order.push(orderBy("name", "desc"));
    } else {
      order.push(orderBy("updated_at", "desc"));
    }
    const whereCondition = {};
    if (search) {
      whereCondition[Op.or] = [
        {
          name: {
            [Op.like]: `%${search}%`,
          },
        }
      ]
    }
    const totalCount = await category.count({
      where: whereCondition,
    })
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const result = await category.findAll({
      where: whereCondition,
      order: order,
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage,
    })
    return messages.success({ messages: "successfully get all category", totalRows: totalCount, totalPages, currentPage, itemsPerPage }, result);
  } catch (error) {
    console.log(error);
    return messages.error(500, error.message);
  }
}

module.exports = getAllCategory