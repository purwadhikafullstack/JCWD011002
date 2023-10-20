const { createProductCategory, getAllCategory, updateProductCategory, deleteProductCategory, getProductList, getProductById, createProduct, updateProduct, updateStock, getProducts,
  getProduct,
  getCategoryById,
  updateImageCategory, } = require('../controllers/productController');
const authentication = require('../middlewares/authentication');
const multer = require('../middlewares/multer');
const disableProduct = require('../services/productService/deleteProduct');

const router = require("express").Router();

// router.patch("/stock", authentication, updateStock)
// category routes
router.get("/category", getAllCategory)
router.get("/category/:id", getCategoryById)
router.patch("/category/image/:id", multer.multerUpload("image"), updateImageCategory)
router.post("/category", authentication, multer.multerUpload("image"), createProductCategory)
router.patch("/category/:id", authentication, multer.multerUpload("image"), updateProductCategory)
router.delete("/category/:id", authentication, deleteProductCategory)

// product routes
router.get("/admin", authentication, getProductList)
router.get("/admin/:id", authentication, getProductById)
router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", authentication, multer.multerUpload("image"), createProduct)
router.patch("/:id", authentication, multer.multerUpload("image"), updateProduct)
router.patch("/:id", authentication, disableProduct)

module.exports = router 
