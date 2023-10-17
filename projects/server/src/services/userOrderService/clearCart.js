const { cart_product, sequelize } = require("../../database");
const { messages } = require("../../helpers");

const clearCart = async (userId) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      await cart_product.destroy({
        where: { id_cart: userId },
        transaction: t,
      });

      return "Cart cleared successfully";
    });

    return messages.success(result);
  } catch (error) {
    console.error("Error clearing cart:", error);
    return messages.error(500, error.message || "Internal server error");
  }
};

module.exports = clearCart;
