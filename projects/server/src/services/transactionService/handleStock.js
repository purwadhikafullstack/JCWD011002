const {
  product,
  product_warehouse,
  stock_history,
  warehouse,
} = require("../../database");
const geolib = require("geolib");

const handleStock = async (
  cartProduct,
  userId,
  transactionId,
  myLatitude,
  myLongitude
) => {
  try {
    for (const item of cartProduct) {
      const productInfo = await product.findOne({
        where: { id: item.id_product },
      });

      if (productInfo) {
        const productWarehouses = await product_warehouse.findAll({
          where: { id_product: item.id_product },
        });
        let nearestWarehouse = null;
        let nearestDistance = Infinity;
        for (const warehouseData of productWarehouses) {
          const warehouseInfo = await warehouse.findByPk(
            warehouseData.id_warehouse
          );
          if (warehouseInfo) {
            const distance = geolib.getDistance(
              { latitude: myLatitude, longitude: myLongitude },
              {
                latitude: parseFloat(warehouseInfo.latitude),
                longitude: parseFloat(warehouseInfo.longitude),
              }
            );

            if (distance < nearestDistance) {
              nearestDistance = distance;
              nearestWarehouse = warehouseInfo;
            }
          }
        }

        if (nearestWarehouse) {
          const { id: nearestWarehouseId, name: nearestWarehouseName } =
            nearestWarehouse;
          console.log("Nearest Warehouse:", nearestWarehouseName);

          // Reduce stock from the nearest warehouse first
          const nearestProductWarehouse = productWarehouses.find(
            (pw) => pw.id_warehouse === nearestWarehouseId
          );

          if (nearestProductWarehouse) {
            const qtyToReduceFromNearest = Math.min(
              nearestProductWarehouse.stock,
              item.qty
            );

            await product_warehouse.update(
              {
                stock: nearestProductWarehouse.stock - qtyToReduceFromNearest,
              },
              {
                where: { id: nearestProductWarehouse.id },
              }
            );

            await stock_history.create({
              id_user: userId,
              id_warehouse_from: nearestWarehouseId,
              id_warehouse_to: null,
              id_product: item.id_product,
              id_transaction: transactionId,
              qty: qtyToReduceFromNearest,
              id_status: 8,
              last_stock:
                nearestProductWarehouse.stock - qtyToReduceFromNearest,
            });

            item.qty -= qtyToReduceFromNearest;
          }

          if (item.qty > 0) {
            for (const warehouseData of productWarehouses) {
              if (warehouseData.id_warehouse !== nearestWarehouseId) {
                const productWarehouse = productWarehouses.find(
                  (pw) => pw.id_warehouse === warehouseData.id_warehouse
                );

                if (productWarehouse && productWarehouse.stock >= item.qty) {
                  await product_warehouse.update(
                    {
                      stock: productWarehouse.stock - item.qty,
                    },
                    {
                      where: { id: productWarehouse.id },
                    }
                  );

                  await stock_history.create({
                    id_user: userId,
                    id_warehouse_from: productWarehouse.id_warehouse,
                    id_warehouse_to: nearestWarehouseId,
                    id_product: item.id_product,
                    id_transaction: transactionId,
                    qty: item.qty,
                    id_status: 7,
                    last_stock: productWarehouse.stock - item.qty,
                  });

                  item.qty = 0;
                  break;
                }
              }
            }
          }
        } else {
          console.error(
            `No suitable warehouse found for product ${item.id_product}`
          );
        }
      }
    }
  } catch (error) {
    console.error("Error decreasing product stock:", error);
  }
};

module.exports = handleStock;
