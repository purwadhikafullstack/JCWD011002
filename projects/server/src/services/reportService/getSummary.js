const {
  transaction,
  sequelize,
  transaction_product,
  product,
} = require("../../database");

const getBestSellerProduct = async () => {
  try {
    const bestSellerProduct = await transaction_product.findAll({
      attributes: [
        "id_product",
        [sequelize.fn("SUM", sequelize.col("qty")), "total_qty"],
      ],
      group: ["id_product"],
      order: [[sequelize.literal("total_qty"), "DESC"]],
      limit: 1,
      include: [
        {
          model: product,
          attributes: ["name"],
        },
      ],
    });

    if (bestSellerProduct.length > 0) {
      return bestSellerProduct[0].product.name;
    } else {
      return "No best-selling product found";
    }
  } catch (error) {
    throw error;
  }
};

const getSummary = async () => {
  try {
    const activeUserCount = await transaction.count({
      distinct: true,
      col: "id_user",
    });

    const summary = await transaction.findOne({
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("id_user")), "user_count"],
        [
          sequelize.fn(
            "SUM",
            sequelize.literal("CASE WHEN id_status = 5 THEN 1 ELSE 0 END")
          ),
          "order_success",
        ],
        [
          sequelize.fn(
            "COUNT",
            sequelize.literal(
              'CASE WHEN shipping_method = "TIKI" THEN 1 ELSE NULL END'
            )
          ),
          "tiki_count",
        ],
        [
          sequelize.fn(
            "COUNT",
            sequelize.literal(
              'CASE WHEN shipping_method = "POS" THEN 1 ELSE NULL END'
            )
          ),
          "pos_count",
        ],
        [
          sequelize.fn(
            "COUNT",
            sequelize.literal(
              'CASE WHEN shipping_method = "JNE" THEN 1 ELSE NULL END'
            )
          ),
          "jne_count",
        ],
      ],
    });

    const popular_shipping = courierCount(summary);

    return {
      data: [
        {
          user_active: activeUserCount || 0,
          order_success: summary.dataValues.order_success || 0,
          popular_shipping: popular_shipping,
          best_seller_product: await getBestSellerProduct(),
        },
      ],
    };
  } catch (error) {
    throw error;
  }
};

const courierCount = (summary) => {
  const tikiCount = summary.dataValues.tiki_count || 0;
  const posCount = summary.dataValues.pos_count || 0;
  const jneCount = summary.dataValues.jne_count || 0;

  if (tikiCount >= posCount && tikiCount >= jneCount) {
    return "TIKI";
  } else if (posCount >= tikiCount && posCount >= jneCount) {
    return "POS";
  } else {
    return "JNE";
  }
};

module.exports = getSummary;
