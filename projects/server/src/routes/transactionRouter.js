const router = require("express").Router();
const { userOrderController } = require("../controllers");
const { multer } = require("../middlewares");

//get list payment methods
router.get("/", userOrderController.getListPayment);
// create transactiong
router.post("/", userOrderController.addTransaction);
// get detail transaction
router.post("/detail", userOrderController.getDetailTransaction);
//cancel
router.post("/cancel", userOrderController.cancelOrder);
// get distance
router.post("/distance", userOrderController.getDistance);
// get receipt by transaction
router.get("/receipt/:transactionId", userOrderController.getReceipt);
// get transaction by user
router.get("/:userId", userOrderController.getTransaction);
// get what payment method each transaction
router.post("/:id", userOrderController.getPayment);

//upload receipt
router.post(
  "/receipt/:transactionId",
  multer.multerUpload("receipt"),
  userOrderController.UploadReceipt
);

module.exports = router;
