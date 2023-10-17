'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = [
      {
        name: 'SSD',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'VGA',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Monitor',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('categories', categories, {});

    return Promise.resolve();
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});

    return Promise.resolve();
  },
};
