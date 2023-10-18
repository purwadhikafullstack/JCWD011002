const router = require('express').Router();
const { createWarehouse, updateWarehouse, deleteWarehouse, getWarehouse, getWarehouses } = require('../controllers/warehouseController');
const { authentication } = require('../middlewares');
router.get("/admin", authentication, getWarehouse)
router.get("/", authentication, getWarehouses)
router.post("/", authentication, createWarehouse)
router.patch("/:id", authentication, updateWarehouse)
router.delete("/:id", authentication, deleteWarehouse)

module.exports = router
