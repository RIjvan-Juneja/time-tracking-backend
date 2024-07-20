'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const categorys = [
      { name: 'Personal' },
      { name: 'Work' },
      { name: 'Team Work' },
    ];

    await queryInterface.bulkInsert('category', categorys, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('category', null, {});
  }
};
