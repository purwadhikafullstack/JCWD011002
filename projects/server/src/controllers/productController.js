const { messages } = require('../helpers');
const { productCategoryService, productService, stockService } = require('../services');

const createProductCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const body = { name };
    const result = await productCategoryService.createProductCategory(body, req);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const { sort, name, search, page, limit } = req.query
    const result = await productCategoryService.getAllCategory(sort, name, search, page, limit);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productCategoryService.getCategoryById(id);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const updateProductCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const body = { name };
    const result = await productCategoryService.updateProductCategory(id, body, req);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateImageCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productCategoryService.updateImage(id, req);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deleteProductCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productCategoryService.deleteProductCategory(id);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function getProducts(req, res) {
  try {
    const { query } = req;
    const result = await productService.getProducts(query);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getProductList = async (req, res) => {
  try {
    const { id, role } = req.account
    const { sort, id_category, search, page, limit, status } = req.query;
    const result = await productService.getProductList(id, role, sort, id_category, search, page, limit, status);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productService.getProductById(req, res, id);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


async function getProduct(req, res) {
  try {
    const { id } = req.params;
    const result = await productService.getProduct(id);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createProduct = async (req, res) => {
  try {
    const { name, price, id_category, is_active, description } = req.body
    const result = await productService.createProduct(req, res, name, price, id_category, is_active, description);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const { name, price, id_category, is_active, description } = req.body
    const result = await productService.updateProduct(id, name, price, id_category, is_active, description, req)
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const updateStock = async (req, res) => {
  try {
    const { id, role } = req.account
    const { addition, subtraction, warehouseId, productId } = req.body;
    const result = await stockService.updateStock(id, role, addition, subtraction, warehouseId, productId);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createProductCategory, getAllCategory, updateProductCategory, deleteProductCategory, getProductList, getProductById, createProduct, updateProduct, updateStock, getProducts,
  getProduct, getCategoryById, updateImageCategory
};
