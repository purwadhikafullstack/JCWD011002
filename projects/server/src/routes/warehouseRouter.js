const router = require("express").Router();
const { warehouseController } = require("../controllers");
const { authentication } = require("../middlewares");

// Warehouses list
router.get("/", authentication, warehouseController.getWarehouses);

module.exports = router;
