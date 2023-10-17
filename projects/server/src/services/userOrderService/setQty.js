const { product, cart_product, product_warehouse } = require("../../database");
const { messages } = require("../../helpers");

const getProductInfo = async (productId) => {
  return product.findOne({
    where: { id: productId },
    include: [{ model: product_warehouse, as: "product_warehouses" }],
  });
};

const checkStock = async (productId, requestedQuantity) => {
  const productInfo = await getProductInfo(productId);
  if (!productInfo) {
    return false;
  }
  const totalStock = productInfo.product_warehouses.reduce(
    (sum, warehouse) => sum + warehouse.stock,
    0
  );
  return totalStock >= requestedQuantity;
};

const setQty = async (userId, productId, newQuantity) => {
  try {
    const cartItem = await cart_product.findOne({
      where: { id_cart: userId, id_product: productId },
    });
    if (!cartItem) {
      return messages.error(404, "Cart item not found.");
    }
    const isStockSufficient = await checkStock(productId, newQuantity);
    if (!isStockSufficient) {
      return messages.error(400, "Insufficient stock for this product.");
    }

    if (typeof newQuantity !== "number" || newQuantity < 0) {
      return messages.error(400, "Invalid quantity.");
    }
    cartItem.qty = newQuantity;
    await cartItem.save();

    return messages.success("Cart item quantity updated successfully");
  } catch (error) {
    console.error("Error setting cart item quantity:", error);
    return messages.error(500, error.message || "Internal server error");
  }
};

module.exports = setQty;
