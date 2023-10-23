const db = require("../../database");
const { messages } = require("../../helpers");
const { Op } = require("sequelize");
const warehouses = db["warehouse"];

const getWarehouse = async (search, province, name, sort, page, limit) => {
  const orderBy = (field, order) => {
    return order === "desc" ? [field, "DESC"] : [field, "ASC"];
  }
  const currentPage = parseInt(page) || 1;
  const itemsPerPage = parseInt(limit) || 10;
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
      },
      {
        province: {
          [Op.like]: `%${search}%`,
        },
      },
    ];
  }
  if (province) {
    whereCondition.province = province;
  }
  const totalCount = await warehouses.count({
    where: whereCondition,
  });
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const result = await warehouses.findAll({
    where: whereCondition,
    order: order,
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
  });
  return messages.success("warehouse list successfully get", {
    totalRows: totalCount,
    totalPages,
    currentPage,
    itemsPerPage,
    data: result,
  });
}

module.exports = getWarehouse;
