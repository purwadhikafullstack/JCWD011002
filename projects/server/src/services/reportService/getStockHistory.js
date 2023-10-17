const { Op, Sequelize } = require("sequelize");
const db = require("../../database");
const { stock_history, user, product, status, transaction } = db;
const sequelize = db.sequelize;

async function getStockHistory({
  warehouseFrom,
  warehouseTo,
  transactionId,
  startDate,
  endDate,
  searchProduct,
  productId,
  page = 1,
  pageSize = 10,
  orderBy = "desc",
}) {
  try {
    page = parseInt(page, 10);
    pageSize = parseInt(pageSize, 10);

    const whereConditions = {};

    if (productId) {
      whereConditions["$product.id$"] = productId;
    }

    if (warehouseFrom) {
      whereConditions.id_warehouse_from = warehouseFrom;
    }

    if (warehouseTo) {
      whereConditions.id_warehouse_to = warehouseTo;
    }

    if (transactionId) {
      whereConditions.id_transaction = {
        [Op.in]: Array.isArray(transactionId) ? transactionId : [transactionId],
      };
    }

    if (startDate && endDate) {
      whereConditions.created_at = {
        [Op.between]: [startDate, endDate],
      };
    }

    if (searchProduct) {
      whereConditions["$product.name$"] = {
        [Op.like]: `%${searchProduct}%`,
      };
    }

    const totalItems = await stock_history.count({
      where: whereConditions,
      include: [
        {
          model: product,
          attributes: [],
          where: searchProduct
            ? {
                name: {
                  [Op.like]: `%${searchProduct}%`,
                },
              }
            : {},
        },
      ],
    });

    const totalPages = Math.ceil(totalItems / pageSize);

    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const stockHistories = await stock_history.findAll({
      attributes: ["id_user", "qty", "created_at", "id"],
      where: whereConditions,
      include: [
        {
          model: user,
          attributes: ["name"],
        },
        {
          model: product,
          attributes: ["name"],
          where: searchProduct
            ? {
                name: {
                  [Op.like]: `%${searchProduct}%`,
                },
              }
            : {},
        },
        {
          model: status,
          attributes: ["name"],
        },
        {
          model: transaction,
          attributes: ["id"],
        },
      ],
      order: [["created_at", orderBy]],
      offset,
      limit,
    });

    const stockHistory = await Promise.all(
      stockHistories.map(async (history) => {
        const query = `
          SELECT
            wf.name AS warehouseFromName,
            wt.name AS warehouseToName
          FROM
            stock_histories sh
          LEFT JOIN
            warehouses wf ON sh.id_warehouse_from = wf.id
          LEFT JOIN
            warehouses wt ON sh.id_warehouse_to = wt.id
          WHERE
            sh.id = :stockHistoryId;
        `;

        const [result] = await sequelize.query(query, {
          replacements: { stockHistoryId: history.id },
          type: Sequelize.QueryTypes.SELECT,
        });

        return {
          id: history.id,
          name: history.user.name,
          wh_from: result.warehouseFromName || null,
          wh_to: result.warehouseToName || "User",
          product: history.product.name,
          qty: history.qty,
          status: history.status.name,
          txn_date: history.created_at.toLocaleDateString("ID-id") || null,
          txn_id: history.transaction ? history.transaction.id : null,
        };
      })
    );

    return {
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalItems,
      data: stockHistory,
    };
  } catch (error) {
    console.error("Error getting stock history:", error.message);
  }
}

module.exports = getStockHistory;
