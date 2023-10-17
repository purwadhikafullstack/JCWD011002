const { cart_product, product } = require("../../database");

const getCartTotal = async (userId) => {
  try {
    const cartItems = await cart_product.findAll({
      where: { id_cart: userId },
      include: [{ model: product, attributes: ["price"] }],
    });
    let total = 0;
    for (const cartItem of cartItems) {
      const { price } = cartItem.product;
      total += price * cartItem.qty;
    }

    return { status: 200, data: { total } };
  } catch (error) {
    console.error("Error calculating cart total:", error);
    return { status: 500, message: "Internal server error" };
  }
};

module.exports = getCartTotal;
