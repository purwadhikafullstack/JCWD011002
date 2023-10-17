const { transaction_payment } = require("../../database");

const getReceipt = async (transactionId) => {
  try {
    const result = await transaction_payment.findOne({
      where: { id_transaction: transactionId },
    });
    return {
      status: 200,
      receipt: result.receipt,
      id: result.id_transaction,
    };
  } catch (error) {
    console.error("Error getting detail transaction:", error);
    return { status: 500, message: error.message };
  }
};

module.exports = getReceipt;
