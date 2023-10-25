const db = require("../../database/models");
const { messages } = require("../../helpers");
const ProductWarehouse = db.product_warehouse;
const Warehouse = db.warehouse;
const Product = db.product;
const sequelize = db.sequelize;
const Admin = db.admin;
const { Op } = require("sequelize")

const getAdmin = (id) => {
  return Admin.findOne({
    where: {
      id_user: id
    }
  })
}

const getWarehouseStock = async (req, res) => {
  try {
    const { id } = req.account
    const admin = await getAdmin(id)
    const { qty = 0, id_product } = req.query;
    const result = await ProductWarehouse.findAll({
      where: {
        id_product: id_product,
        stock: { [Op.gte]: qty },
        id_warehouse: { [Op.ne]: admin.id_warehouse }
      },
      include: [
        {
          model: Warehouse,
          attributes: ["id", "name"]
        },
        {
          model: Product,
          attributes: ["id", "name"]
        }
      ],
      attributes: {
        exclude: ["id_product", "id_warehouse"]
      },
    })
    res.status(200).json({
      message: "success",
      data: result
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "failed",
    })
  }
}

module.exports = getWarehouseStock