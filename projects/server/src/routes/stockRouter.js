const createMutation = require("../services/stockService/createMutation");
const authentication = require("../middlewares/authentication");
const updateStatusMutation = require("../services/stockService/updateStatusMutation");
const { getPendingStatusWhFrom, getPendingStatusWhTo } = require("../services/stockService/getPendingStatus");
const getMutation = require("../services/stockService/getMutation");
const getWarehouseStock = require("../services/stockService/getWarehouseStock");
const { updateStock } = require("../controllers/productController");

const router = require("express").Router();

router.get("/warehouse", authentication, getWarehouseStock)
router.get("/pendingWhFrom", authentication, getPendingStatusWhFrom)
router.get("/pendingWhTo", authentication, getPendingStatusWhTo)
router.patch("/", authentication, updateStock)
router.get("/", authentication, getMutation)
router.post("/", authentication, createMutation)
router.patch("/:id", authentication, updateStatusMutation)

module.exports = router;