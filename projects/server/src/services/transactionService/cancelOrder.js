const {
  transaction,
  transaction_product,
  stock_history,
  product_warehouse,
  transaction_payment,
  sequelize,
} = require("../../database");

async function cancelOrder(userId, transactionId) {
  try {
    const transactionProducts = await transaction_product.findAll({
      where: { id_transaction: transactionId },
    });

    for (const product of transactionProducts) {
      const productId = product.id_product;
      const qty = product.qty;

      const stockHistories = await stock_history.findAll({
        where: { id_transaction: transactionId, id_product: productId },
      });

      for (const stockHistory of stockHistories) {
        await stock_history.create({
          id_user: userId,
          id_warehouse_from: stockHistory.id_warehouse_from,
          id_warehouse_to: stockHistory.id_warehouse_from,
          id_product: productId,
          id_transaction: transactionId,
          qty: qty,
          id_status: stockHistory.id_status,
          last_stock: stockHistory.last_stock + qty,
        });
      }

      const productWarehouse = await product_warehouse.findOne({
        where: {
          id_warehouse: stockHistories[0].id_warehouse_from,
          id_product: productId,
        },
      });

      if (productWarehouse) {
        productWarehouse.stock += qty;
        await productWarehouse.save();
      }
    }

    await transaction.update(
      { id_status: 6 },
      { where: { id: transactionId } }
    );

    await transaction_payment.update(
      { id_status: 9 },
      { where: { id_transaction: transactionId } }
    );

    await stock_history.update(
      { id_status: 9 },
      { where: { id_transaction: transactionId } }
    );

    return "Order canceled";
  } catch (error) {
    console.error("Error canceling order:", error);
    return "Internal server error";
  }
}

module.exports = cancelOrder;
