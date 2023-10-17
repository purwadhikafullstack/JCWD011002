"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = [
      {
        name: "Seagate 1TB",
        price: 1000,
        image: "product1.jpg",
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        is_active: true,
        id_category: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "RTX 3090",
        price: 1500,
        image: "product2.jpg",
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        is_active: true,
        id_category: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Samsung Curve Monitor",
        price: 800,
        image: "product3.jpg",
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        is_active: true,
        id_category: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert("products", products, {});
    return Promise.resolve();
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("products", null, {});
    return Promise.resolve();
  },
};
