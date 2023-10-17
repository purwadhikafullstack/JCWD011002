const router = require("express").Router();
const { authentication, validation } = require("../middlewares");
const { authController } = require("../controllers");

// Register - for member
router.post(
  "/user",
  validation.register,
  validation.result,
  authController.register
);
// Registration - Complete data
router.put(
  "/user",
  authentication,
  validation.registration,
  validation.result,
  authController.registration
);
// User Login
router.post("/login", authController.login);
// Keep Login - update token login
router.get("/login", authentication, authController.keepLogin);
// Forget Password
router.post("/reset", authController.forgotPassword);
// Reset Password
router.patch("/reset", authentication, authController.resetPassword);

module.exports = router;
