const {
  transaction,
  transaction_product,
  transaction_payment,
  cart_product,
  product,
} = require("../../database");
const handleStock = require("./handleStock");
const { cronJob } = require("../../helpers");

const addTransaction = async (
  userId,
  payment,
  shipping,
  total,
  myLatitude,
  myLongitude,
  shipping_cost,
  shipping_address
) => {
  try {
    const cartProduct = await cart_product.findAll({
      where: { id_cart: userId },
      include: [{ model: product }],
    });

    if (cartProduct.length === 0) {
      return {
        success: false,
        status: 404,
        message: "Cart is empty.",
      };
    }

    const newTransaction = await transaction.create({
      id_user: userId,
      total,
      id_status: 1,
      is_confirm: false,
      shipping_method: shipping,
      shipping_cost,
      shipping_address,
    });

    const transactionProducts = cartProduct.map((item) => ({
      id_transaction: newTransaction.id,
      id_product: item.id_product,
      qty: item.qty,
      price: item.product.price,
    }));
    await transaction_product.bulkCreate(transactionProducts);

    await handleStock(
      cartProduct,
      userId,
      newTransaction.id,
      myLatitude,
      myLongitude
    );

    await transaction_payment.create({
      id_transaction: newTransaction.id,
      id_payment_method: payment,
      shipping_method: shipping,
      id_status: 7,
    });

    await cart_product.destroy({
      where: { id_cart: userId },
    });

    cronJob.startCronJob(userId);
    
    return {
      success: true,
      status: 200,
      data: {
        id_transaction: newTransaction.id,
      },
    };
  } catch (error) {
    console.error("Error adding transaction:", error);
    return {
      success: false,
      message: "Failed to add the transaction.",
    };
  }
};

module.exports = addTransaction;
