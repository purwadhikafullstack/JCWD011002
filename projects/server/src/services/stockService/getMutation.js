const db = require("../../database/models");
const { messages } = require("../../helpers");
const stockHistory = db.stock_history;
const productWarehouse = db.product_warehouse;
const sequelize = db.sequelize;
const Admin = db.admin;
const Warehouse = db.warehouse;
const User = db.user;
const Product = db.product;
const Status = db.status;
const { Op } = require("sequelize");

const getAdmin = (id) => {
  return Admin.findOne({
    where: {
      id_user: id
    }
  })
}

const includeModel = () => {
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

const getMutation = async (req, res) => {
  try {
    const { sort, status, warehouse_from, warehouse_to, search, page, limit, month, year } = req.query;
    const { id, role } = req.account;
    const admin = await getAdmin(id);

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found"
      });
    }

    let order = [["updated_at", "DESC"]];
    if (sort === "oldest") {
      order = [["updated_at", "ASC"]];
    }

    let result;

    let where = {
      [Op.and]: [
        { id_warehouse_from: { [Op.not]: null } },
        { id_warehouse_to: { [Op.not]: null } }
      ],
      [Op.or]: [
        { id_status: 7 },
        { id_status: 8 },
        { id_status: 9 }
      ]
    };
    if (status) {
      where.id_status = status;
    }
    if (warehouse_from) {
      where.id_warehouse_from = warehouse_from;
    }
    if (warehouse_to) {
      where.id_warehouse_to = warehouse_to;
    }

    if (search) {
      where = {
        [Op.and]: [
          where,
          {
            '$Product.name$': {
              [Op.like]: `%${search}%`
            },
          }
        ]
      };
    }

    if (month && year) {
      const targetDate = new Date(year, month - 1, 1);
      const nextMonth = new Date(year, month, 1);

      where = {
        [Op.and]: [
          where,
          {
            updated_at: {
              [Op.gte]: targetDate,
              [Op.lt]: nextMonth,
            },
          },
        ],
      };
    }

    if (role === "admin warehouse") {
      where = {
        [Op.and]: [
          where,
          sequelize.or(
            {
              id_warehouse_from: {
                [Op.not]: null,
                [Op.eq]: admin.id_warehouse
              }
            },
            {
              id_warehouse_to: {
                [Op.not]: null,
                [Op.eq]: admin.id_warehouse
              }
            }
          )
        ],
        [Op.or]: [
          { id_status: 8 },
          { id_status: 9 }
        ]
      };
    }

    const pageInt = parseInt(page) || 1;
    const limitInt = parseInt(limit) || 10;

    const offset = (pageInt - 1) * limitInt;
    const totalCount = await stockHistory.count({ where, include: includeModel() });

    const totalPages = Math.ceil(totalCount / limitInt);

    result = await stockHistory.findAll({
      where,
      attributes: ["id", "id_status", "qty", "created_at", "updated_at"],
      include: includeModel(),
      order,
      limit: limitInt,
      offset
    });

    res.status(200).json({
      totalRows: totalCount,
      totalPages,
      currentPage: pageInt,
      itemsPerPage: limitInt,
      data: result
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed"
    });
  }
};



module.exports = getMutation;
