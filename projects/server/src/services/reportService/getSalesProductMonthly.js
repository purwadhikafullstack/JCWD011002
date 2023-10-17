const { Op, Sequelize } = require("sequelize");
const models = require("../../database");

const getSalesProductMonthly = async (
  page = 1,
  pageSize = 100000,
  filterByMonth,
  filterByYear,
  orderBy,
  warehouseId
) => {
  page = parseInt(page);
  pageSize = parseInt(pageSize);

  try {
    const whereClause = {
      id_status: {
        [Op.not]: 6,
      },
    };

    if (filterByMonth && filterByYear) {
      whereClause.created_at = {
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("created_at")),
            filterByYear
          ),
          Sequelize.where(
            Sequelize.fn("MONTH", Sequelize.col("created_at")),
            filterByMonth
          ),
        ],
      };
    }

    const transactions = await models.transaction.findAll({
      include: [
        {
          model: models.transaction_product,
          attributes: ["id", "qty", "price"],
          include: [
            {
              model: models.product,
              attributes: ["id", "name", "image"],
              as: "product",
              include: [
                {
                  model: models.category,
                  attributes: ["id", "name"],
                  as: "_category",
                },
              ],
            },
          ],
        },
        {
          model: models.stock_history,
          attributes: ["id_warehouse_from"],
        },
      ],
      where: whereClause,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const monthlySalesData = {};
    let idCounter = 1;

    transactions.forEach((transaction) => {
      const month = new Date(transaction.created_at).getMonth() + 1;
      const year = new Date(transaction.created_at).getFullYear();
      const key = `${year}-${month}`;

      if (!monthlySalesData[key]) {
        monthlySalesData[key] = {
          month_id: idCounter,
          month,
          year,
          total_sales_monthly: 0,
          month_sales: [],
        };
        idCounter++;
      }

      const monthSale = monthlySalesData[key];

      transaction.transaction_products.forEach((productTransaction) => {
        const productData = productTransaction.product;
        const existingProduct = monthSale.month_sales.find(
          (item) => item.product_id === productData.id
        );

        if (!existingProduct) {
          monthSale.month_sales.push({
            product_id: productData.id,
            product_name: productData.name,
            image: productData.image,
            id_category: productData._category.id,
            category_name: productData._category.name,
            total_qty_sold_product: productTransaction.qty,
            total_sales_product:
              productTransaction.price * productTransaction.qty,
            detail_product_sales: [
              {
                data_id: 1,
                transaction_id: transaction.id,
                transaction_date:
                  transaction.created_at.toLocaleDateString("id"),
                qty: productTransaction.qty,
                price: productTransaction.price,
                warehouse_id: transaction.stock_histories[0]?.id_warehouse_from,
              },
            ],
          });
        } else {
          existingProduct.total_qty_sold_product += productTransaction.qty;
          existingProduct.total_sales_product +=
            productTransaction.price * productTransaction.qty;
          existingProduct.detail_product_sales.push({
            data_id: existingProduct.detail_product_sales.length + 1,
            transaction_id: transaction.id,
            transaction_date: transaction.created_at.toLocaleDateString("id"),
            qty: productTransaction.qty,
            price: productTransaction.price,
            warehouse_id: transaction.stock_histories[0]?.id_warehouse_from,
          });
        }

        monthSale.total_sales_monthly +=
          productTransaction.price * productTransaction.qty;
      });
    });

    Object.values(monthlySalesData).forEach((monthSale) => {
      monthSale.month_sales.forEach((productSale) => {
        productSale.total_sales_product =
          productSale.detail_product_sales.reduce(
            (total, sale) => total + sale.qty * sale.price,
            0
          );
      });
    });

    const monthlySalesArray = Object.values(monthlySalesData);

    if (orderBy === "total_sales_monthly asc") {
      monthlySalesArray.sort(
        (a, b) => a.total_sales_monthly - b.total_sales_monthly
      );
    } else if (orderBy === "total_sales_monthly desc") {
      monthlySalesArray.sort(
        (a, b) => b.total_sales_monthly - a.total_sales_monthly
      );
    }

    if (orderBy === "created_at asc") {
      monthlySalesArray.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    } else if (orderBy === "created_at desc") {
      monthlySalesArray.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    }

    const totalPage = Math.ceil(monthlySalesArray.length / pageSize);

    return {
      totalPage,
      totalItems: monthlySalesArray.length,
      pageSize,
      currentPage: page,
      data: monthlySalesArray,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = getSalesProductMonthly;
