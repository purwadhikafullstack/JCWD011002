const db = require("../../database/models");
const Product = db.product;
const { messages } = require("../../helpers");

const disableProduct = async (req, res) => {
  try {
    await sequelize.transaction(async (t) => {
      const result = await Product.update({
        is_active: req.body.is_active,
      },
        {
          where: {
            id: req.params.id
          }
        }, { transaction: t })
      return res.status(200).json({
        message: "Product successfully updated."

      })
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

module.exports = disableProduct