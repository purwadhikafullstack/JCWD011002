"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("roles", [
      { name: "user", created_at: new Date(), updated_at: new Date() },
      { name: "admin", created_at: new Date(), updated_at: new Date() },
      { name: "admin warehouse", created_at: new Date(), updated_at: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("roles", null, {});
  },
};
