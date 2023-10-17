// const { transaction, sequelize } = require("../../database");

// const getMonthlySales = async () => {
//   const monthlySales = await transaction.findAll({
//     attributes: [
//       [sequelize.fn("MONTH", sequelize.col("created_at")), "month"],
//       [sequelize.fn("YEAR", sequelize.col("created_at")), "year"],
//       [sequelize.fn("SUM", sequelize.col("total")), "total_sales_per_month"],
//     ],
//     group: [
//       sequelize.fn("MONTH", sequelize.col("created_at")),
//       sequelize.fn("YEAR", sequelize.col("created_at")),
//     ],
//     raw: true,
//   });

//   return {
//     status: 200,
//     currentPage: 1,
//     pageSize: monthlySales.length,
//     total_data: monthlySales.length,
//     totalPages: 1,
//     data: monthlySales.map((sales, index) => ({
//       data_id: index + 1,
//       month: getMonth(sales.month),
//       year: sales.year,
//       total_sales_per_month: sales.total_sales_per_month,
//     })),
//   };
// };

// function getMonth(monthNumber) {
//   const monthNames = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   return monthNames[monthNumber - 1];
// }

// module.exports = getMonthlySales;

const { transaction, sequelize } = require("../../database");

const getMonthlySales = async () => {
  const monthlySales = await transaction.findAll({
    attributes: [
      [sequelize.fn("MONTH", sequelize.col("created_at")), "month"],
      [sequelize.fn("YEAR", sequelize.col("created_at")), "year"],
      [sequelize.fn("SUM", sequelize.col("total")), "total_sales_per_month"],
    ],
    group: [
      sequelize.fn("MONTH", sequelize.col("created_at")),
      sequelize.fn("YEAR", sequelize.col("created_at")),
    ],
    raw: true,
  });

  const monthComparison = (a, b) => {
    const aSort = a.year * 100 + a.month;
    const bSort = b.year * 100 + b.month;
    return aSort - bSort;
  };

  monthlySales.sort(monthComparison);

  return {
    status: 200,
    currentPage: 1,
    pageSize: monthlySales.length,
    total_data: monthlySales.length,
    totalPages: 1,
    data: monthlySales.map((sales, index) => ({
      data_id: index + 1,
      month: getMonth(sales.month),
      year: sales.year,
      total_sales_per_month: sales.total_sales_per_month,
    })),
  };
};

function getMonth(monthNumber) {
  const monthNames = [
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
  return monthNames[monthNumber - 1];
}

module.exports = getMonthlySales;
