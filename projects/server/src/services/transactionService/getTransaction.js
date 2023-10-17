const {
  transaction,
  transaction_product,
  product,
  status,
} = require("../../database");
const { Op } = require("sequelize");

const getTransaction = async (
  userId,
  searchProductName,
  sortBy,
  page,
  pageSize,
  filterStatus,
  startDate,
  endDate
) => {
  try {
    const pageNumber = parseInt(page, 10) || 1;
    const limit = parseInt(pageSize, 10) || 10;
    const offset = (pageNumber - 1) * limit;

    const whereConditions = { id_user: userId };

    if (filterStatus) {
      whereConditions.id_status = filterStatus;
    }

    if (startDate && endDate) {
      whereConditions.created_at = {
        [Op.between]: [startDate, endDate],
      };
    }

    const totalCount = await transaction.count({ where: whereConditions });

    const transactions = await transaction.findAll({
      where: whereConditions,
      include: [
        {
          model: transaction_product,
          include: [
            {
              model: product,
              attributes: ["name", "image"],
              where: searchProductName
                ? { name: { [Op.like]: `%${searchProductName}%` } }
                : {},
            },
          ],
        },
        {
          model: status,
          attributes: ["name"],
        },
      ],
      order: [["created_at", sortBy === "desc" ? "DESC" : "ASC"]],
      limit: limit,
      offset: offset,
    });

    const transactionData = transactions.map((txn) => {
      const { id, created_at, total, status, transaction_products } = txn;
      const firstProduct = transaction_products[0];
      const productName = firstProduct ? firstProduct.product.name : "N/A";
      const productImage = firstProduct ? firstProduct.product.image : "N/A";
      const numProducts = txn.transaction_products.length;
      const options = { year: "numeric", month: "long", day: "numeric" };
      return {
        transactionId: id,
        txn_date: created_at.toLocaleString("id-ID", options),
        total,
        status: status.name,
        product_name: productName,
        product_image: productImage,
        numProducts,
        created_at,
      };
    });

    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = pageNumber;

    return {
      total_page: totalPages,
      total_item: totalCount,
      current_page: currentPage,
      data: transactionData,
    };
  } catch (error) {
    console.error("Error getting transactions:", error);
    return { status: 500, message: error.message };
  }
};

module.exports = getTransaction;
