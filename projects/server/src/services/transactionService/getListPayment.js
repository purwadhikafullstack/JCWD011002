const { payment_method } = require("../../database");

const getListPayment = async () => {
  try {
    const list_payment = await payment_method.findAll();
    return { data: list_payment };
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    throw error;
  }
};

module.exports = getListPayment;
