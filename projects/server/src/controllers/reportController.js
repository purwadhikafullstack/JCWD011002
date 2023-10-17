const { messages } = require("../helpers");
const { reportService } = require("../services");

const getStockHistory = async (req, res) => {
  try {
    const {
      warehouseFrom,
      warehouseTo,
      transactionId,
      startDate,
      endDate,
      page,
      pageSize,
      orderBy,
      searchProduct,
      productId,
    } = req.query;
    const result = await reportService.getStockHistory({
      warehouseFrom,
      warehouseTo,
      transactionId,
      startDate,
      endDate,
      page,
      pageSize,
      orderBy,
      searchProduct,
      productId,
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getAllStockHistory = async (req, res) => {
  try {
    const {
      filterByMonth,
      filterByYear,
      filterByWarehouse,
      page,
      pageSize,
      orderBy,
    } = req.query;
    const result = await reportService.getAllStockHistory(
      filterByMonth,
      filterByYear,
      filterByWarehouse,
      page,
      pageSize,
      orderBy
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getSalesReport = async (req, res) => {
  try {
    const { page, pageSize, filterByMonth, filterByYear, orderBy } = req.query;
    const result = await reportService.getSalesReport(
      page,
      pageSize,
      filterByMonth,
      filterByYear,
      orderBy
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getSalesProduct = async (req, res) => {
  try {
    const {
      page,
      pageSize,
      productId,
      warehouseId,
      filterByMonth,
      filterByYear,
      orderBy,
    } = req.query;
    const result = await reportService.getSalesProduct(
      page,
      pageSize,
      productId,
      warehouseId,
      filterByMonth,
      filterByYear,
      orderBy
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getSalesCategory = async (req, res) => {
  try {
    const {
      page,
      pageSize,
      categoryId,
      warehouseId,
      filterByMonth,
      filterByYear,
      orderBy,
    } = req.query;
    const result = await reportService.getSalesCategory(
      page,
      pageSize,
      categoryId,
      warehouseId,
      filterByMonth,
      filterByYear,
      orderBy
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getMonthlySales = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const result = await reportService.getMonthlySales(page, pageSize);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getSalesProductMonthly = async (req, res) => {
  try {
    const {
      page,
      pageSize,
      filterByMonth,
      filterByYear,
      orderBy,
      warehouseId,
    } = req.query;
    const result = await reportService.getSalesProductMonthly(
      page,
      pageSize,
      filterByMonth,
      filterByYear,
      orderBy,
      warehouseId
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getSummary = async (req, res) => {
  try {
    const result = await reportService.getSummary();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getSalesWH = async (req, res) => {
  try {
    const { warehouseId } = req.params;
    const result = await reportService.getSalesWH(warehouseId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getStockHistory,
  getAllStockHistory,
  getSalesReport,
  getSalesProduct,
  getSalesCategory,
  getMonthlySales,
  getSalesProductMonthly,
  getSummary,
  getSalesWH,
};
