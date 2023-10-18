const { product, warehouse, product_warehouse, sequelize } = require('../../database/models')
const { messages } = require('../../helpers')

const createProduct = async (req, res, name, price, id_category, is_active, description) => {
  try {
    const image = req.file.path

    const isProductExist = await product.findOne({
      where: {
        name: name
      }
    })
    if (isProductExist) {
      return messages.error(400, 'Product already exist')
    }

    return await sequelize.transaction(async (t) => {
      const result = await product.create({
        name,
        price,
        image: image,
        description,
        is_active,
        id_category
      }, { transaction: t })

      const warehouses = await warehouse.findAll()

      for (const warehouse of warehouses) {
        await product_warehouse.create({
          id_product: result.id,
          id_warehouse: warehouse.id,
          stock: 0
        }, { transaction: t })
      }
      // await t.commit();
      // return messages.success('successfully created product', result)
      // return res.status(201).json(result)
      return messages.success('successfully created product', result)
    })
  }
  catch (error) {
    console.log(error)
    return messages.error(500, error.message)
    // return messages.error(500, error.message || 'Internal server error')
  }
}

module.exports = createProduct