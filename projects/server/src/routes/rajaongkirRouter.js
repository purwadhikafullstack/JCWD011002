const router = require("express").Router();
const { rajaongkirController } = require("../controllers");

router.get("/city", rajaongkirController.getCity);
router.get("/province", rajaongkirController.getProvince);
router.post("/cost", rajaongkirController.getCost);
router.get("/citybyprovince", rajaongkirController.getCityByProvince);

module.exports = router;
