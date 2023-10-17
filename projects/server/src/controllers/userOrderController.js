const { userOrderService, transactionService } = require("../services");
const { messages } = require("../helpers");

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ CART ZONE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const addToCart = async (req, res) => {
  try {
    const { productId, quantity, userId } = req.body;
    const result = await userOrderService.addToCart(
      // req.user.id,
      userId,
      productId,
      quantity
    );

    if (result.status === 200) {
      return res
        .status(200)
        .json(messages.success("Product added to cart successfully"));
    } else {
      return res
        .status(result.status)
        .json(messages.error(result.status, result.message));
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json(messages.error(500, error.message));
  }
};

async function removeFromCart(req, res) {
  try {
    const { productId, userId } = req.body;
    const result = await userOrderService.removeFromCart(userId, productId);
    if (result.status === 200) {
      return res
        .status(200)
        .json(messages.success("Success Remove Product From Cart"));
    } else {
      return res
        .status(result.status)
        .json(messages.error(result.status, result.message));
    }
  } catch (error) {
    console.error("Error removing from cart:", error);
    return res.status(500).json(messages.error(500, error.message));
  }
}

const editCartItem = async (req, res) => {
  try {
    const { quantity, userId, productId } = req.body;
    const result = await userOrderService.editCartItem(
      userId,
      productId,
      quantity
    );

    if (result.status === 200) {
      return res
        .status(200)
        .json(messages.success("Cart item updated successfully"));
    } else {
      return res
        .status(result.status)
        .json(messages.error(result.status, result.message));
    }
  } catch (error) {
    console.error("Error editing cart item:", error);
    return res.status(500).json(messages.error(500, error.message));
  }
};

async function clearCart(req, res) {
  try {
    const userId = req.params.userId;
    const result = await userOrderService.clearCart(userId);
    if (result.status === 200) {
      return res
        .status(200)
        .json(messages.success("Cart cleared successfully"));
    } else {
      return res
        .status(result.status)
        .json(messages.error(result.status, result.message));
    }
  } catch (error) {
    console.error("Error resetting cart:", error);
    return res.status(500).json(messages.error(500, error.message));
  }
}

async function getCartTotal(req, res) {
  try {
    const userId = req.params.userId;
    const result = await userOrderService.getCartTotal(userId);
    if (result.status === 200) {
      return res.status(200).json(messages.response({ data: result.data }));
    } else {
      return res
        .status(result.status)
        .json(messages.error(result.status, result.message));
    }
  } catch (error) {
    console.error("Error getting cart total:", error);
    return res.status(500).json(messages.error(500, error.message));
  }
}

async function viewCart(req, res) {
  try {
    const userId = req.params.userId;
    const result = await userOrderService.viewCart(userId);
    return res
      .status(result.status)
      .json(messages.response({ data: result.data }));
  } catch (error) {
    console.error("Error viewing cart:", error);
    return res.status(500).json(messages.error(500, error.message));
  }
}

async function setQty(req, res) {
  try {
    const { quantity, userId, productId } = req.body;
    const result = await userOrderService.setQty(userId, productId, quantity);
    if (result.status === 200) {
      return res
        .status(200)
        .json(messages.success("Cart item updated successfully"));
    } else {
      return res
        .status(result.status)
        .json(messages.error(result.status, result.message));
    }
  } catch (error) {
    console.error("Error setting quantity:", error);
    return res.status(500).json(messages.error(500, error.message));
  }
}
// +++++++++++++++++++++++++++++++++++++++++++++++++++++ CHECKOUT/TRANSACTION ZONE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

async function addTransaction(req, res) {
  try {
    const {
      userId,
      payment,
      shipping,
      total,
      myLatitude,
      myLongitude,
      shipping_cost,
      shipping_address,
    } = req.body;
    const result = await transactionService.addTransaction(
      userId,
      payment,
      shipping,
      total,
      myLatitude,
      myLongitude,
      shipping_cost,
      shipping_address
    );
    return res.status(result.status).json(messages.response(result));
  } catch (error) {
    console.error("Error adding transaction:", error);
    return res.status(500).json(messages.error(500, error.message));
  }
}

async function getListPayment(req, res) {
  try {
    const result = await transactionService.getListPayment();
    return res.status(200).json(messages.response(result));
  } catch (error) {
    console.error("Error getting payment:", error);
    return res.status(500).json(messages.error(500, error.message));
  }
}

async function getDistance(req, res) {
  try {
    const { myLatitude, myLongitude } = req.body;
    const result = await transactionService.getDistance(
      myLatitude,
      myLongitude
    );
    if (!result) {
      return res.status(404).json({ error: "No warehouses found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error calculating nearest warehouse:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getTransaction(req, res) {
  try {
    const userId = req.params.userId;
    const {
      searchProductName,
      sortBy,
      page,
      pageSize,
      filterStatus,
      startDate,
      endDate,
    } = req.query;

    const result = await transactionService.getTransaction(
      userId,
      searchProductName,
      sortBy,
      page,
      pageSize,
      filterStatus,
      startDate,
      endDate
    );
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error getting transaction:", error);
    return res.status(500).json(messages.error(500, error.message));
  }
}

async function getDetailTransaction(req, res) {
  try {
    const { userId, transactionId } = req.body;
    const result = await transactionService.getDetailTransaction(
      userId,
      transactionId
    );
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error getting detail transaction:", error);
    return res.status(500).json(messages.error(500, error.message));
  }
}

async function getPayment(req, res) {
  try {
    const userId = req.params.id;
    const { transactionId } = req.body;
    const result = await transactionService.getPayment(userId, transactionId);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error getting payment:", error);
    return res.status(500).json(messages.error(500, error.message));
  }
}

async function cancelOrder(req, res) {
  try {
    const { userId, transactionId } = req.body;
    const result = await transactionService.cancelOrder(userId, transactionId);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error canceling order:", error);
    return res.status(500).json(messages.error(500, error.message));
  }
}

// +++++++++++++++++++++++++++++++++++++++++++++++ RECEIPT +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

async function UploadReceipt(req, res) {
  try {
    const transactionId = req.params.transactionId;
    const { file } = req;
    const UploadedReceipt = await transactionService.UploadReceipt(
      transactionId,
      file
    );
    return res.status(200).json(UploadedReceipt);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function getReceipt(req, res) {
  try {
    const transactionId = req.params.transactionId;
    const result = await transactionService.getReceipt(transactionId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

module.exports = {
  addToCart,
  removeFromCart,
  editCartItem,
  clearCart,
  getCartTotal,
  viewCart,
  setQty,
  addTransaction,
  getListPayment,
  getDistance,
  UploadReceipt,
  getTransaction,
  getDetailTransaction,
  getPayment,
  getReceipt,
  cancelOrder,
};
