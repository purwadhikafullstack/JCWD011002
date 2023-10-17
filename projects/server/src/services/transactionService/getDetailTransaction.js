const {
  transaction,
  transaction_product,
  transaction_payment,
  payment_method,
  status,
  product,
} = require("../../database");

const getDetailTransaction = async (userId, transactionId) => {
  try {
    const txn = await transaction.findOne({
      where: { id: transactionId, id_user: userId },
      include: [
        {
          model: transaction_product,
          attributes: ["id_product", "qty", "price"],
          include: [
            {
              model: product,
              attributes: ["name", "image"],
            },
          ],
        },
        {
          model: status,
          attributes: ["name"],
        },
      ],
    });

    if (!txn) {
      return { status: 404, message: "Transaction not found" };
    }

    const payment = await transaction_payment.findOne({
      where: { id_transaction: txn.id },
      include: { model: payment_method, attributes: ["name"] },
    });
    const paymentStatus = await transaction_payment.findOne({
      where: { id_transaction: txn.id },
      include: { model: status, attributes: ["name"] },
    });
    const options = { year: "numeric", month: "long", day: "numeric" };
    const transactionData = {
      transactionId: txn.id,
      created_at: txn.created_at.toLocaleDateString("id-ID", options),
      total: txn.total,
      //   id_status: txn.id_status,
      status: txn.status.name,
      is_confirm: txn.is_confirm,
      payment_method: payment.payment_method.name,
      payment_status: paymentStatus.status.name,
      receipt: payment.receipt,
      shipping_method: txn.shipping_method,
      shipping_cost: txn.shipping_cost,
      shipping_address: txn.shipping_address,
      product_count: txn.transaction_products.length,
      transaction_products: txn.transaction_products.map((item) => ({
        id_product: item.id_product,
        name: item.product.name,
        image: item.product.image,
        qty: item.qty,
        price: item.price,
      })),
    };

    return { status: 200, data: transactionData };
  } catch (error) {
    console.error("Error getting detail transaction:", error);
    return { status: 500, message: error.message };
  }
};

module.exports = getDetailTransaction;
