const { Op, literal } = require("sequelize");
const {
  transaction_product,
  product_warehouse,
  sequelize,
  warehouse,
} = require("../../database");

const findWarehouseName = async (warehouseId) => {
  const warehouseInfo = await warehouse.findOne({
    where: { id: warehouseId },
  });
  return warehouseInfo ? warehouseInfo.name : null;
};

const getSalesWH = async (warehouseId) => {
  const currentYear = new Date().getFullYear();
  const parse = parseInt(warehouseId);
  const warehouseName = await findWarehouseName(parse);

  const salesData = await transaction_product.findAll({
    attributes: [
      [
        sequelize.fn(
          "DATE_FORMAT",
          sequelize.col("transaction_product.created_at"),
          "%Y-%m"
        ),
        "month",
      ],
      [
        sequelize.fn("sum", sequelize.literal("qty * price")),
        "total_sales_per_month",
      ],
    ],
    include: [
      {
        model: product_warehouse,
        as: "productWarehouse",
        where: { id_warehouse: parse },
      },
    ],
    where: literal(
      `YEAR(transaction_product.created_at) = ${currentYear} AND MONTH(transaction_product.created_at) BETWEEN 1 AND 12`
    ),
    group: [
      sequelize.fn(
        "DATE_FORMAT",
        sequelize.col("transaction_product.created_at"),
        "%Y-%m"
      ),
    ],
    raw: true,
  });

  let dataId = 1;
  const formattedSalesData = salesData.map((data) => ({
    data_id: dataId++,
    month: new Date(data.month).toLocaleDateString("en-US", { month: "long" }),
    year: currentYear,
    total_sales_per_month: data.total_sales_per_month,
  }));

  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  formattedSalesData.sort((a, b) => {
    return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
  });

  return {
    id_warehouse: parse,
    warehouseName,
    warehouse_sales: formattedSalesData,
  };
};

module.exports = getSalesWH;
