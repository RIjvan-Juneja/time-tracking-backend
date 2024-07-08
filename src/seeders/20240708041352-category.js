'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const categorys = [
      { name: 'personal' },
      { name: 'work' },
      { name: 'team_work' },
    ];

    await queryInterface.bulkInsert('category', categorys, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('category', null, {});
  }
};
