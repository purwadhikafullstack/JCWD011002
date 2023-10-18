const router = require("express").Router();
const { userOrderController, adminController } = require("../controllers");
const { multer, authentication, authorization } = require("../middlewares");

// Get All transaction
router.get("/", authentication, authorization, adminController.getTransactions);
// create transactiong
router.post("/", userOrderController.addTransaction);
// get detail transaction
router.get("/detail/:transactionId", userOrderController.getDetailTransaction);
//cancel
router.post("/cancel", userOrderController.cancelOrder);
// get distance
router.post("/distance", userOrderController.getDistance);
//get list payment methods
router.get("/payments", userOrderController.getListPayment);
// get receipt by transaction
router.get("/receipt/:transactionId", userOrderController.getReceipt);
// get transaction by user
router.get("/:userId", userOrderController.getTransaction);
// get what payment method each transaction
router.post("/:id", userOrderController.getPayment);
// Update Order Status
router.patch("/status/:id", authentication, adminController.updateOrderStatus);

//upload receipt
router.post(
  "/receipt/:transactionId",
  multer.multerUpload("receipt"),
  userOrderController.UploadReceipt
);

module.exports = router;
