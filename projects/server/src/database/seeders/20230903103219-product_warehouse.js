"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const productWarehouses = [
      {
        id_warehouse: 1,
        id_product: 1,
        stock: 100,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_warehouse: 1,
        id_product: 2,
        stock: 50,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_warehouse: 2,
        id_product: 1,
        stock: 75,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_warehouse: 2,
        id_product: 3,
        stock: 200,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_warehouse: 3,
        id_product: 3,
        stock: 100,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert(
      "product_warehouses",
      productWarehouses,
      {}
    );

    return Promise.resolve();
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("product_warehouses", null, {});

    return Promise.resolve();
  },
};
