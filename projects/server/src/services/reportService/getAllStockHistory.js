const { Op } = require("sequelize");
const models = require("../../database");

const getAllStockHistory = async () => {
  try {
    const warehouses = await models.warehouse.findAll();

    const warehouseData = [];

    for (const warehouse of warehouses) {
      const warehouseStockHistory = await models.stock_history.findAll({
        where: {
          id_warehouse_from: warehouse.id,
        },
        order: [["created_at", "DESC"]],
      });

      const warehouseMonths = [];
      const uniqueMonths = [];

      for (const history of warehouseStockHistory) {
        const historyMonth = new Date(history.created_at).getMonth() + 1;
        const historyYear = new Date(history.created_at).getFullYear();
        const monthYearKey = `${historyMonth}-${historyYear}`;

        if (!uniqueMonths.includes(monthYearKey)) {
          uniqueMonths.push(monthYearKey);

          const productStockHistory = await models.stock_history.findAll({
            where: {
              id_warehouse_from: warehouse.id,
              created_at: {
                [Op.between]: [
                  new Date(`${historyYear}-${historyMonth}-01`),
                  new Date(`${historyYear}-${historyMonth + 1}-01`),
                ],
              },
            },
          });

          const productStockDataMap = new Map();

          for (const productHistory of productStockHistory) {
            const product = await models.product.findByPk(
              productHistory.id_product
            );

            if (!productStockDataMap.has(product.id)) {
              productStockDataMap.set(product.id, {
                id_product: product.id,
                product_name: product.name,
                subtraction_qty: 0,
                addition_qty: 0,
                final_qty_mutation: 0,
                last_stock_in_warehouse: 0, 
              });
            }

            const productData = productStockDataMap.get(product.id);
            if (productHistory.id_status === 1) {
              productData.addition_qty += productHistory.qty;
              productData.final_qty_mutation += productHistory.qty;
            } else {
              productData.subtraction_qty += productHistory.qty;
              productData.final_qty_mutation -= productHistory.qty;
            }
          }

          const productStockData = Array.from(productStockDataMap.values());
          const sumSubtractionQty = productStockData.reduce(
            (acc, product) => acc + product.subtraction_qty,
            0
          );
          const sumAdditionQty = productStockData.reduce(
            (acc, product) => acc + product.addition_qty,
            0
          );

          for (const productData of productStockData) {
            const lastStock = await getLastStock(productData.id_product);
            productData.last_stock_in_warehouse = lastStock;
          }

          warehouseMonths.push({
            month_id: historyMonth,
            month: new Date(history.created_at).toLocaleString("en-US", {
              month: "long",
            }),
            year: historyYear,
            sum_subtraction_qty: sumSubtractionQty,
            sum_addition_qty: sumAdditionQty,
            product_stock_history: productStockData,
          });
        }
      }

      warehouseData.push({
        id_warehouse: warehouse.id,
        warehouse_name: warehouse.name,
        data: warehouseMonths,
      });
    }

    return {
      total_page: 1,
      current_page: 1,
      total_items: warehouseData.length,
      data: warehouseData,
    };
  } catch (error) {
    throw error;
  }
};

async function getLastStock(productId) {
  const lastStock = await models.stock_history.findOne({
    attributes: [[models.sequelize.literal("last_stock"), "last_stock"]],
    where: {
      id_product: productId,
    },
    order: [["created_at", "DESC"]],
    include: [
      {
        model: models.product,
        attributes: ["id", "name"],
      },
    ],
  });

  return lastStock ? lastStock.dataValues.last_stock : 0;
}

module.exports = getAllStockHistory;
