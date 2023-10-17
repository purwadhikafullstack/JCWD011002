const { Op } = require("sequelize");
const db = require("../../database");
const { sequelize } = require("../../database");

const getSalesReport = async (
  page = 1,
  pageSize = 10,
  filterByMonth,
  filterByYear,
  orderBy
) => {
  try {
    const filterCriteria = {};
    const validPage = parseInt(page, 10);
    const validPageSize = parseInt(pageSize, 10);

    if (filterByMonth && filterByYear) {
      filterCriteria.created_at = {
        [Op.and]: [
          sequelize.where(
            sequelize.fn("MONTH", sequelize.col("created_at")),
            filterByMonth
          ),
          sequelize.where(
            sequelize.fn("YEAR", sequelize.col("created_at")),
            filterByYear
          ),
        ],
      };
    } else if (filterByMonth) {
      filterCriteria.created_at = sequelize.where(
        sequelize.fn("MONTH", sequelize.col("created_at")),
        filterByMonth
      );
    } else if (filterByYear) {
      filterCriteria.created_at = sequelize.where(
        sequelize.fn("YEAR", sequelize.col("created_at")),
        filterByYear
      );
    }

    const offset = (validPage - 1) * validPageSize;
    const limit = validPageSize;

    const order = [["created_at", "DESC"]];

    if (orderBy) {
      if (orderBy === "date_asc") {
        order[0] = ["created_at", "ASC"];
      } else if (orderBy === "date_desc") {
        order[0] = ["created_at", "DESC"];
      } else if (orderBy === "total_desc") {
        order[0] = ["total", "DESC"];
      } else if (orderBy === "total_asc") {
        order[0] = ["total", "ASC"];
      }
    }

    const transactions = await db.transaction.findAll({
      where: filterCriteria,
      include: [
        {
          model: db.user,
          attributes: ["name"],
        },
        {
          model: db.status,
          attributes: ["name"],
        },
        {
          model: db.transaction_product,
          include: [
            {
              model: db.product,
              attributes: ["id", "name", "price", "image"],
              include: [
                {
                  model: db.category,
                  as: "_category",
                  attributes: ["id", "name"],
                },
                {
                  model: db.product_warehouse,
                  include: [
                    {
                      model: db.warehouse,
                      attributes: ["id", "name"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      offset,
      limit,
      order,
    });

    const totalItems = await db.transaction.count({
      where: filterCriteria,
    });

    const totalPages = Math.ceil(totalItems / validPageSize);
    const result = [];

    for (const transaction of transactions) {
      const payment = await db.transaction_payment.findOne({
        where: { id_transaction: transaction.id },
        include: [
          {
            model: db.payment_method,
            attributes: ["name"],
          },
          {
            model: db.status,
            attributes: ["name"],
          },
        ],
      });

      result.push({
        transactionId: transaction.id,
        user_name: transaction.user.name,
        created_at: transaction.created_at.toLocaleDateString("id"),
        total: transaction.total,
        status: transaction.status.name,
        is_confirm: transaction.is_confirm,
        payment_method: payment.payment_method.name,
        payment_status: payment.status.name,
        receipt: payment.receipt,
        shipping_method: transaction.shipping_method,
        shipping_cost: transaction.shipping_cost,
        shipping_address: transaction.shipping_address,
        product_count: transaction.transaction_products.length,
        products: transaction.transaction_products.map((product) => ({
          id_product: product.product.id,
          name: product.product.name,
          id_category: product.product._category.id,
          category: product.product._category.name,
          id_warehouse: product.product.product_warehouses[0].warehouse.id,
          warehouse_name: product.product.product_warehouses[0].warehouse.name,
          image: product.product.image,
          qty: product.qty,
          price: product.price,
        })),
      });
    }

    return {
      totalItems,
      pageSize,
      currentPage: validPage,
      totalPages,
      data: result,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = getSalesReport;
