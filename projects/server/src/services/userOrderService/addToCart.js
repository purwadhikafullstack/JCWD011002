const {
  product,
  cart_product,
  product_warehouse,
  sequelize,
} = require("../../database");
const { messages } = require("../../helpers");

const addToCart = async (userId, productId, quantity) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const productInfo = await product.findOne({
        where: { id: productId },
        include: [{ model: product_warehouse, as: "product_warehouses" }],
        transaction: t,
      });

      if (!productInfo) {
        throw new Error("Product not found.");
      }

      let totalStock = 0;
      for (const warehouse of productInfo.product_warehouses) {
        totalStock += warehouse.stock;
      }

      if (quantity > totalStock) {
        throw new Error("Insufficient stock for this product.");
      }

      const existingCartItem = await cart_product.findOne({
        where: { id_cart: userId, id_product: productId },
        transaction: t,
      });

      if (existingCartItem) {
        const totalQuantityInCart = await cart_product.sum("qty", {
          where: { id_cart: userId, id_product: productId },
          transaction: t,
        });

        if (totalQuantityInCart + quantity > totalStock) {
          throw new Error("Insufficient stock for this product.");
        }

        existingCartItem.qty += quantity;
        await existingCartItem.save({ transaction: t });
      } else {
        await cart_product.create(
          {
            id_cart: userId,
            id_product: productId,
            qty: quantity,
          },
          {
            transaction: t,
          }
        );
      }
      console.log("SINI>>")

      return "Product added to cart successfully";
    });

    return messages.success(result);
  } catch (error) {
    return messages.error(500, error.message || "Internal server error.");
  }
};

module.exports = addToCart;
