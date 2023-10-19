const { Op } = require("sequelize");

const db = require("../../database/models");
const { messages } = require("../../helpers");
const StockHistory = db.stock_history;
const Warehouse = db.warehouse;
const Product = db.product;
const Admin = db.admin;
const Status = db.status;
const User = db.user;

const getAdmin = async (id) => {
  return Admin.findOne({
    where: {
      id_user: id
    }
  });
};

const includeModes = () => {

  return [
    {
      model: User,
      attributes: ["name"]
    },
    {
      model: Warehouse,
      as: "_warehouse_from",
      attributes: ["name"]
    },
    {
      model: Warehouse,
      as: "_warehouse_to",
      attributes: ["name"]
    },
    {
      model: Product,
      attributes: ["name"]
    },
    {
      model: Status,
      attributes: ["name"]
    }
  ]
}

const getPendingStatusWhTo = async (req, res) => {
  try {
    const { id } = req.account;
    const { sort, warehouse_from, search, page, limit } = req.query;

    let order = [["created_at", "DESC"]];
    if (sort === "oldest") {
      order = [["created_at", "ASC"]];
    }

    let where = {
      id_user: id,
      id_status: 7
    };


    if (warehouse_from) {
      where.id_warehouse_from = warehouse_from;
    }

    if (search) {
      where = {
        ...where,
        '$Product.name$': {
          [Op.like]: `%${search}%`
        }
      };
    }

    const pageInt = parseInt(page) || 1;
    const limitInt = parseInt(limit) || 10;
    const offset = (pageInt - 1) * limitInt;

    const totalCount = await StockHistory.count({ where, include: includeModes() });
    const totalPages = Math.ceil(totalCount / limitInt);

    const result = await StockHistory.findAll({
      where,
      order,
      include: includeModes(),
      attributes: ["id", "id_status", "qty", "created_at", "updated_at"],
      limit: limitInt,
      offset
    });

    return res.status(200).json({
      message: "success",
      totalRows: totalCount,
      totalPages,
      currentPage: pageInt,
      itemsPerPage: limitInt,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "failed"
    });
  }
};


const getPendingStatusWhFrom = async (req, res) => {
  try {
    const { id } = req.account;
    const admin = await getAdmin(id);
    const { sort, warehouse_to, search, page, limit } = req.query

    let order = [["created_at", "DESC"]];
    if (sort === "oldest") {
      order = [["created_at", "ASC"]];
    }
    let where = {
      id_status: 7,
      id_warehouse_from: admin.id_warehouse
    }
    if (warehouse_to) {
      where.id_warehouse_to = warehouse_to;
    }
    if (search) {
      where = {
        ...where,
        '$Product.name$': {
          [Op.like]: `%${search}%`
        }
      }
    }
    const pageInt = parseInt(page) || 1;
    const limitInt = parseInt(limit) || 10;
    const offset = (pageInt - 1) * limitInt;

    const totalCount = await StockHistory.count({ where, include: includeModes() });
    const totalPages = Math.ceil(totalCount / limitInt);

    const result = await StockHistory.findAll({
      // where: {
      //   id_status: 7,
      //   id_warehouse_from: admin.id_warehouse
      // },
      where,
      order,
      include: includeModes(),
      attributes: ["id", "id_status", "qty", "created_at", "updated_at"],
      limit: limitInt,
      offset
    });

    return res.status(200).json({
      message: "success",
      totalRows: totalCount,
      totalPages,
      currentPage: pageInt,
      itemsPerPage: limitInt,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "failed",
    });
  }
};

module.exports = { getPendingStatusWhFrom, getPendingStatusWhTo };
