const { col, fn, Op } = require("sequelize");
const db = require("../../database");
const { messages, pagination } = require("../../helpers");

const transactions = db["transaction"];
const users = db["user"];
const statuses = db["status"];
const transaction_payments = db["transaction_payment"];
const payment_methods = db["payment_method"];
const stock_histories = db["stock_history"];

function setInclude(transactionStatus, warehouse, search="") {
  const conditions = {
    [Op.or]: {
      [Op.and]: {
        id_warehouse_from: warehouse,
        id_warehouse_to: { [Op.is]: null },
      },
      [Op.and]: {
        id_warehouse_from: { [Op.not]: null },
        id_warehouse_to: warehouse,
      },
    },
  };
  return [
    {
      model: users,
      attributes: ["id", "username"],
      where: {
        username: { [Op.like]: `%${search}%` },
      },
    },
    {
      model: statuses,
      attributes: ["name"],
      where: { id: transactionStatus },
    },
    {
      model: transaction_payments,
      include: [
        {
          model: statuses,
          attributes: ["name"],
        },
        {
          model: payment_methods,
          attributes: ["name"],
        },
      ],
    },
    {
      model: stock_histories,
      attributes: ["id_product", ["id_warehouse_from", "warehouse"]],
      where: warehouse ? conditions : {},
    },
  ];
}

function setDate(year, month) {
  return new Date(year, month);
}

function setWhere(year, month) {
  const startDate = setDate(year, month);
  const endDate = setDate(year, parseInt(month) + 1);
  const conditions = {
    created_at: {
      [Op.between]: [startDate, endDate],
    },
  };
  // if (warehouse) conditions["$stock_histories.id_warehouse_from$"] = warehouse;
  return conditions;
}

const attributes = {
  exclude: ["id_user", "id_status"],
};

async function getTransactions(access, query) {
  const { page = 1, limit = 10, sort = "DESC", status } = query;
  const { warehouse, year, month, search = "" } = query;
  const pages = pagination.setPagination(page, limit);

  const { count, rows: result } = await transactions.findAndCountAll({
    attributes,
    include: setInclude(status, warehouse, search),
    order: [["created_at", sort]],
    where: setWhere(year, month),
    // subQuery: false,
    distinct: true,
    ...pages,
  });

  const payload = {
    pages: Math.ceil(count / limit),
    transactions: result,
  };

  return messages.success("", payload);
}

module.exports = getTransactions;
