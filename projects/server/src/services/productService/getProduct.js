const { col, cast, fn } = require("sequelize");
const db = require("../../database");
const { messages } = require("../../helpers");

const products = db["product"];
const categories = db["category"];
const product_warehouses = db["product_warehouse"];

const include = [
  {
    model: product_warehouses,
    attributes: [],
  },
  {
    model: categories,
    as: "_category",
    attributes: [],
  },
];

async function getProduct(id) {
  const result = await products.findOne({
    include,
    attributes: {
      include: [
        [col("_category.name"), "category"],
        [fn("sum", col("product_warehouses.stock")), "stock"],
      ],
      exclude: ["id_category"],
    },
    where: { id },
  });
  if (!result || !result?.id) return messages.error(404, "Product not found");
  return messages.success("", result);
}

module.exports = getProduct;
