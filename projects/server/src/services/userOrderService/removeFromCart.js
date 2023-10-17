const { cart_product, sequelize } = require("../../database");
const { messages } = require("../../helpers");

const removeFromCart = async (userId, productId) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const cartItem = await cart_product.findOne({
        where: { id_cart: userId, id_product: productId },
        transaction: t,
      });

      if (!cartItem) {
        throw new Error("Cart item not found.");
      }

      await cartItem.destroy({ transaction: t });
      return "Product removed from the cart successfully";
    });

    return messages.success(result);
  } catch (error) {
    console.error("Error removing from cart:", error);
    return messages.error(500, error.message || "Internal server error");
  }
};

module.exports = removeFromCart;
