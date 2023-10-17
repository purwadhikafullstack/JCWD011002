const { messages } = require("../helpers");
const { productCategoryService, productService } = require("../services");

const createProductCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const body = { name };
    console.log("body", body.name);

    const result = await productCategoryService.createProductCategory(body);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const result = await productCategoryService.getAllCategory();
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProductCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    console.log("id", id);
    const body = { name };
    const result = await productCategoryService.updateProductCategory(id, body);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteProductCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productCategoryService.deleteProductCategory(id);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

async function getProducts(req, res) {
  try {
    const { query } = req;
    const result = await productService.getProducts(query);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

async function getProduct(req, res) {
  try {
    const { id } = req.params;
    const result = await productService.getProduct(id);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createProductCategory,
  getAllCategory,
  updateProductCategory,
  deleteProductCategory,
  getProducts,
  getProduct,
};
