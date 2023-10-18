const { Op, Sequelize } = require("sequelize");
const {
  transaction_product,
  product,
  category,
  product_warehouse,
  sequelize,
} = require("../../database");

const getSalesCategory = async (
  page = 1,
  pageSize = 10,
  categoryId,
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

    if (categoryId) {
      where[Op.and] = [
        ...(where[Op.and] || []),
        sequelize.where(sequelize.col("product._category.id"), categoryId),
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
          sequelize.fn(
            "DATE_FORMAT",
            sequelize.col("transaction_product.created_at"),
            "%Y-%m"
          ),
          "month_year",
        ],
        [sequelize.col("product._category.id"), "id_category"],
        [sequelize.fn("SUM", sequelize.col("qty")), "total_qty_sold"],
        [
          sequelize.fn("SUM", sequelize.literal("transaction_product.price * qty")),
          "total_price_sold",
        ],
        [sequelize.col("product._category.name"), "category_name"],
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
          attributes: [],
          include: [
            {
              model: category,
              as: "_category",
              attributes: [],
              as: "_category",
            },
          ],
        },
        {
          model: product_warehouse,
          as: "productWarehouse",
          attributes: [],
        },
      ],
      group: ["month_year", "product._category.id"],
      order: [
        [sequelize.literal(orderBy || "total_qty_sold DESC")],
        [sequelize.literal("month_year DESC")],
      ],
      offset: (page - 1) * page_size,
      limit: page_size,
    });

    const categories = salesData.map((sales) => ({
      id_category: sales.getDataValue("id_category"),
      category_name: sales.getDataValue("category_name"),
      total_qty_sold: sales.getDataValue("total_qty_sold"),
      total_sales: sales.getDataValue("total_price_sold"),
      month_year: sales.getDataValue("month_year"),
      warehouse_id: sales.getDataValue("warehouse_ids").split(","),
    }));

    const total_count = categories.length;
    const totalPages = Math.ceil(total_count / (page_size - 1));

    return {
      status: 200,
      currentPage: Number(page),
      page_size: Number(page_size),
      total_data: categories.length,
      totalPages,
      categories,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = getSalesCategory;
