const db = require("../../database/models");
const { messages } = require("../../helpers");
const stockHistory = db.stock_history;
const productWarehouse = db.product_warehouse;
const sequelize = db.sequelize;

const updateStatusMutation = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_status } = req.body;

    const warehouse = await stockHistory.findOne({
      where: {
        id: id
      }
    });

    if (!warehouse) {
      return res.status(404).json({ message: "Stock history not found" });
    }

    return await sequelize.transaction(async (t) => {
      const result = await stockHistory.update(
        {
          id_status: id_status
        },
        {
          where: {
            id
          },
          transaction: t
        }
      );

      if (id_status === 8) {
        await productWarehouse.decrement(
          'stock',
          {
            by: warehouse.qty,
            where: {
              id_product: warehouse.id_product,
              id_warehouse: warehouse.id_warehouse_from
            },
            transaction: t
          }
        );

        await productWarehouse.increment(
          'stock',
          {
            by: warehouse.qty,
            where: {
              id_product: warehouse.id_product,
              id_warehouse: warehouse.id_warehouse_to
            },
            transaction: t
          }
        );
      }

      return res.status(200).json({
        message: "Success",
        data: result,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updateStatusMutation;
