const {
  cart_product,
  product,
  product_warehouse,
  sequelize,
} = require("../../database");
const { messages } = require("../../helpers");

const editCartItem = async (userId, productId, quantity) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const cartItem = await cart_product.findOne({
        where: { id_cart: userId, id_product: productId },
        transaction: t,
      });

      if (!cartItem) {
        throw new Error("Cart item not found.");
      }

      const existingQuantity = cartItem.qty;

      const isStockSufficient = await checkStock(
        productId,
        existingQuantity + quantity,
        t
      );

      if (!isStockSufficient) {
        throw new Error("Insufficient stock for this product.");
      }

      cartItem.qty += quantity;

      if (cartItem.qty <= 0) {
        await cartItem.destroy({ transaction: t });
        return "Cart item removed from the cart.";
      }

      await cartItem.save({ transaction: t });
      return "Cart item updated successfully";
    });

    return messages.success(result);
  } catch (error) {
    console.error("Error editing cart item:", error);
    return messages.error(500, error.message || "Internal server error");
  }
};

const checkStock = async (productId, requestedQuantity, t) => {
  const productInfo = await getProductInfo(productId, t);

  if (!productInfo) {
    return false;
  }

  const totalStock = productInfo.product_warehouses.reduce(
    (sum, warehouse) => sum + warehouse.stock,
    0
  );

  return totalStock >= requestedQuantity;
};

const getProductInfo = async (productId, t) => {
  return product.findOne({
    where: { id: productId },
    include: [{ model: product_warehouse, as: "product_warehouses" }],
    transaction: t,
  });
};

module.exports = editCartItem;
