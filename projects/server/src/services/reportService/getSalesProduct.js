const { Op, Sequelize, literal } = require("sequelize");
const {
  transaction_product,
  product,
  category,
  product_warehouse,
  sequelize,
} = require("../../database");

const getSalesProduct = async (
  page = 1,
  pageSize = 10,
  productId,
  warehouseId,
  filterByMonth,
  filterByYear,
  orderBy
) => {
  try {
    const page_size = parseInt(pageSize);
    const where = {};

    if (filterByMonth && filterByYear) {
      where[Op.and] = [
        sequelize.where(
          sequelize.fn(
            "MONTH",
            sequelize.col("transaction_product.created_at")
          ),
          filterByMonth
        ),
        sequelize.where(
          sequelize.fn("YEAR", sequelize.col("transaction_product.created_at")),
          filterByYear
        ),
      ];
    } else if (filterByMonth) {
      where[Op.and] = sequelize.where(
        sequelize.fn("MONTH", sequelize.col("transaction_product.created_at")),
        filterByMonth
      );
    } else if (filterByYear) {
      where[Op.and] = sequelize.where(
        sequelize.fn("YEAR", sequelize.col("transaction_product.created_at")),
        filterByYear
      );
    }

    if (productId) {
      where[Op.and] = [
        ...(where[Op.and] || []),
        sequelize.where(sequelize.col("product.id"), productId),
      ];
    }

    if (warehouseId) {
      where[Op.and] = [
        ...(where[Op.and] || []),
        sequelize.where(
          sequelize.col("productWarehouse.id_warehouse"),
          warehouseId
        ),
      ];
    }

    const salesData = await transaction_product.findAll({
      where,
      attributes: [
        [
          sequelize.literal(
            "DATE_FORMAT(transaction_product.created_at, '%Y-%m')"
          ),
          "month_year",
        ],
        "id_product",
        [sequelize.fn("SUM", sequelize.col("qty")), "total_qty_sold"],
        [
          sequelize.literal(
            "GROUP_CONCAT(DISTINCT productWarehouse.id_warehouse)"
          ),
          "warehouse_ids",
        ],
      ],
      include: [
        {
          model: product,
          attributes: [
            "id",
            "name",
            "id_category",
            "image",
            "description",
            "price",
          ],
          include: {
            model: category,
            as: "_category",
            attributes: ["name"],
          },
        },
        {
          model: product_warehouse,
          as: "productWarehouse",
          attributes: [],
        },
      ],
      group: ["month_year", "id_product"],
      order: [
        [sequelize.literal(orderBy || "total_qty_sold DESC")],
        [sequelize.literal(orderBy || "month_year DESC")],
        // [sequelize.literal("month_year desc")],
      ],
      offset: (page - 1) * page_size,
      limit: page_size,
    });

    const products = salesData.map((sales) => ({
      id_product: sales.product.id,
      name: sales.product.name,
      id_category: sales.product.id_category,
      category: sales.product._category ? sales.product._category.name : "",
      image: sales.product.image,
      description: sales.product.description,
      price: sales.product.price,
      total_qty_sold: sales.getDataValue("total_qty_sold"),
      total_sales: sales.getDataValue("total_qty_sold") * sales.product.price,
      month_year: sales.getDataValue("month_year"),
      warehouse_id: sales.getDataValue("warehouse_ids").split(","),
    }));

    const total_count = products.length;
    const totalPages = Math.ceil(total_count / (page_size - 1));

    return {
      status: 200,
      page: Number(page),
      page_size: Number(page_size),
      totalProducts: products.length,
      totalPages,
      products,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = getSalesProduct;
