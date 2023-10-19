const { getUserAddress, createUserAddress, updateUserAddress, deleteUserAddress, getUserAddressById, getDefault } = require("../controllers/userAddressController");
const authentication = require("../middlewares/authentication");
const router = require("express").Router();

router.post("/", authentication, createUserAddress);
router.get("/", authentication, getUserAddress)
router.get("/:id", authentication, getUserAddressById);
router.patch("/:id", authentication, updateUserAddress);
router.delete("/:id", authentication, deleteUserAddress);
router.post("/default", authentication, getDefault);
module.exports = router