const router = require("express").Router();
const { userOrderController, adminController } = require("../controllers");
const { multer, authentication, authorization } = require("../middlewares");

// Get All transaction
router.get("/", authentication, authorization, adminController.getTransactions);
// create transactiong
router.post("/", authentication, userOrderController.addTransaction);
//cancel
router.post("/cancel", authentication, userOrderController.cancelOrder);
// get distance
router.post("/distance", authentication, userOrderController.getDistance);
//get list payment methods
router.get("/payments", authentication, userOrderController.getListPayment);
// get receipt by transaction
router.get("/receipt/:transactionId", authentication, userOrderController.getReceipt);
// get detail transaction
router.get("/detail/:transactionId", authentication, userOrderController.getDetailTransaction);
// get list transaction by user
router.get("/:userId", authentication, userOrderController.getTransaction);
// get what payment method each transaction
router.post("/:id", userOrderController.getPayment);
// Update Order Status
router.patch("/status/:id", authentication, adminController.updateOrderStatus);
//upload receipt
router.post(
  "/receipt/:transactionId",
  authentication,
  multer.multerUpload("receipt"),
  userOrderController.UploadReceipt
);

module.exports = router;
