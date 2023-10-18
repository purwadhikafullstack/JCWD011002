'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('statuses', [{
      name: "Menunggu Pembayaran",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Menunggu Konfirmasi Pembayaran",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Diproses",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Dikirim",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pesanan Dikonfirmasi",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Dibatalkan",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pending",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Approve",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Reject",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Added By Admin",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Reduce By Admin",
      created_at: new Date(),
      updated_at: new Date()
    },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
