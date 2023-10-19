const router = require("express").Router();
const { userOrderController } = require("../controllers");
const { authentication, authorization } = require("../middlewares");

//add to cart
router.post("/", authentication, userOrderController.addToCart);
//remove product from cart
router.post("/remove", authentication, userOrderController.removeFromCart);
//subtract and addition product
router.patch("/", userOrderController.editCartItem);
// set item qty
router.patch("/set", authentication, userOrderController.setQty);
//clear cart
router.delete("/:userId", authentication, userOrderController.clearCart);
//get cart total
router.get("/:userId", authentication, userOrderController.getCartTotal);
//view cart
router.get("/cart/:userId", authentication, userOrderController.viewCart);

module.exports = router;
