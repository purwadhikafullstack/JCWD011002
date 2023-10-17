const router = require("express").Router();
const { userOrderController } = require("../controllers");
const { authentication, authorization } = require("../middlewares");

//add to cart
router.post("/", authentication, userOrderController.addToCart);
//remove product from cart
router.post("/remove", userOrderController.removeFromCart);
//subtract and addition product
router.patch("/", userOrderController.editCartItem);
// set item qty
router.patch("/set", userOrderController.setQty);
//clear cart
router.delete("/:userId", userOrderController.clearCart);
//get cart total
router.get("/:userId", userOrderController.getCartTotal);
//view cart
router.get("/cart/:userId", userOrderController.viewCart);

module.exports = router;
