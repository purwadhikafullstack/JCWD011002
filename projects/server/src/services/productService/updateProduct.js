const db = require("../../database/models");
const sequelize = db.sequelize;
const Product = db.product;
const { messages } = require("../../helpers")
const { Op } = require('sequelize')
const fs = require('fs')

const updateProduct = async (id, name, price, id_category, is_active, description, req) => {
  try {
    const product = await Product.findByPk(id);
    let updateData = {
      name: name,
      price: price,
      id_category: id_category,
      is_active: is_active,
      description: description
    }
    if (req.file && req.file.path) {
      updateData.image = req.file.path;

      if (product.image && fs.existsSync(product.image)) {
        fs.unlinkSync(product.image);
      }
    }

    return await sequelize.transaction(async (t) => {
      const result = await Product.update(
        updateData,
        {
          where: {
            id: id
          }
        },
        { transaction: t }
      );
      return messages.success("Product successfully updated!", result)
    });
  } catch (error) {
    console.log(error);
    return messages.error(500, error.message)
  }
}

module.exports = updateProduct