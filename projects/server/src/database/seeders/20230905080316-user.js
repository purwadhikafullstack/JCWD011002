'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'user',
        username: 'user',
        password: '$2a$12$Nd5snxNmQFF5WnJLqgAnWeGorW3gfAUJBg5RYJh7JTPJGYALtJCRu', //password = Password1!.
        email: 'user@gmail.com',
        phone: '089089089089',
        id_role: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        name: 'admin',
        username: 'admin',
        password: '$2a$12$Nd5snxNmQFF5WnJLqgAnWeGorW3gfAUJBg5RYJh7JTPJGYALtJCRu', //password = Password1!.
        email: 'admin@gmail.com',
        phone: '123123123123',
        id_role: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        name: 'admin warehouse',
        username: 'admin_warehouse',
        password: '$2a$12$Nd5snxNmQFF5WnJLqgAnWeGorW3gfAUJBg5RYJh7JTPJGYALtJCRu', //password = Password1!.
        email: 'warehouse@gmail.com',
        phone: '123412341234',
        id_role: 3,
        created_at: new Date(),
        updated_at: new Date()
      }
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
