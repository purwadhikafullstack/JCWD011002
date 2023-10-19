const db = require("../../database/models");
const Product = db.product;
const Category = db.category;
const ProductWarehouse = db.product_warehouse;
const Warehouse = db.warehouse;
const Admin = db.admin;
const { messages } = require("../../helpers");
const { Op } = require('sequelize')

const getProductList = async (id, role, sort, price, name, id_category, search, page, limit, status) => {
  try {
    const admin = await Admin.findOne({
      where: {
        id_user: id,
      },
    })
    const orderBy = (field, order) => {
      return order === "desc" ? [field, "DESC"] : [field, "ASC"];
    };
    const currentPage = parseInt(page) || 1;
    const itemsPerPage = parseInt(limit) || 10;

    let orderCriteria = [];
    if (sort) {
      orderCriteria.push(orderBy("created_at", sort));
    } else if (price) {
      orderCriteria.push(orderBy("price", price));
    } else if (name) {
      orderCriteria.push(orderBy("name", name));
    } else {
      orderCriteria.push(orderBy("created_at", "desc"));
    }

    const whereCondition = {};

    if (search) {
      whereCondition.name = {
        [Op.like]: `%${search}%`,
      };
    }

    if (id_category) whereCondition.id_category = id_category;
    if (status) whereCondition.is_active = status;

    const totalCount = await Product.count({
      where: whereCondition,
    });

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const productList = await Product.findAll({
      where: whereCondition,
      order: orderCriteria,
      include: [{ model: Category, as: "_category", attributes: ["name"] }, {
        model: ProductWarehouse, where: { id_warehouse: role === "admin warehouse" ? admin.id_warehouse : { [Op.not]: null } }, attributes: ["id_warehouse", "id_product", "stock"], include: { model: Warehouse, attributes: ["id", "name"] }
      }],
      offset: (currentPage - 1) * itemsPerPage,
      limit: itemsPerPage,
    });

    return messages.success("Product list retrieved successfully", {
      totalRows: totalCount,
      totalPages: totalPages,
      currentPage: currentPage,
      itemsPerPage: itemsPerPage,
      data: productList
    })
  } catch (error) {
    console.log(error);
    return messages.error(500, error.message);
  }
}

module.exports = getProductList