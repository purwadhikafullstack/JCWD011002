const router = require("express").Router();
const { reportController } = require("../controllers");
const { authentication } = require('../middlewares');

router.get("/stock", authentication, reportController.getStockHistory);
router.get("/stock/summary", authentication, reportController.getAllStockHistory);

router.get("/sales", authentication, reportController.getSalesReport);
router.get("/sales/product", authentication, reportController.getSalesProduct);
router.get("/sales/product/permonth", authentication, reportController.getSalesProductMonthly);
router.get("/sales/category", authentication, reportController.getSalesCategory);
router.get("/sales/monthly", authentication, reportController.getMonthlySales);
router.get("/sales/warehouse/:warehouseId", authentication, reportController.getSalesWH);

router.get("/summary-card", authentication, reportController.getSummary);

module.exports = router;
