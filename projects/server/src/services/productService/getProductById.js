const db = require('../../database/models')
const Product = db.product
const Warehouse = db.warehouse
const ProductWarehouse = db.product_warehouse
const Category = db.category
const Admin = db.admin
const { messages } = require('../../helpers')
const { Op } = require('sequelize')

const getProductById = async (req, res, id) => {
  try {
    const id_admin = req.account.id
    const role = req.account.role
    const admin = await Admin.findOne({
      where: {
        id_user: id_admin,
      },
    })
    console.log("ini admin", admin)
    const product = await Product.findOne({
      where: { id }, include: [
        {
          model: Category,
          as: "_category",
          attributes: ["name"]
        },
        {
          model: ProductWarehouse, where: {
            id_warehouse: role === "admin warehouse" ? admin.id_warehouse : { [Op.not]: null },
          },
          attributes: ["id_warehouse", "id_product", "stock"],
          include: {
            model: Warehouse,
            attributes: ["id", "name"]
          }
        }
      ]
    })
    if (!product) return messages.error(404, "Product not found")
    // return res.status(200).json({
    //   message: "Product retrieved successfully",
    //   data: product,
    // })
    return messages.success("Product retrieved successfully", product)
  } catch (error) {
    console.log(error)
    return messages.error(500, error.message)
  }
}

module.exports = getProductById