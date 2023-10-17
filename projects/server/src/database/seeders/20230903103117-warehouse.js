'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const warehouses = [
      {
        name: 'Warehouse A',
        address: '123 Main Street',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Warehouse B',
        address: '456 Elm Street',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Warehouse C',
        address: '789 Oak Street',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('warehouses', warehouses, {});
    return Promise.resolve();
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('warehouses', null, {});

    return Promise.resolve();
  },
};
