const {
  transaction,
  transaction_product,
  transaction_payment,
  payment_method,
  status,
  product,
} = require("../../database");

const getPayment = async (userId, transactionId) => {
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
      include: { model: payment_method, attributes: ["name", "identifier"] },
    });

    const transactionData = {
      transactionId: txn.id,
      payment_method: payment.payment_method.name,
      identifier: payment.payment_method.identifier,
    };

    return { status: 200, data: transactionData };
  } catch (error) {
    console.error("Error getting detail transaction:", error);
    return { status: 500, message: error.message };
  }
};
module.exports = getPayment;
