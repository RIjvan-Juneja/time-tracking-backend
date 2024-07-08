'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    const roles = [
      { role_name: 'Admin' },
      { role_name: 'employee' },
    ];

    await queryInterface.bulkInsert('roles', roles, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};


