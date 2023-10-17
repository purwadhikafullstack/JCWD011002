const router = require("express").Router();
const { getUser, updateProfile, changePassword, getUsers } = require("../controllers/userProfileController");
const { authentication, authorization, multer, validation } = require("../middlewares");

router.get('/', authentication, authorization, getUsers);
router.get("/:id", authentication, getUser)
router.patch("/", authentication, multer.multerUpload("avatar"), validation.updateProfile, validation.result, updateProfile)
router.patch("/password", authentication, changePassword)
module.exports = router;
