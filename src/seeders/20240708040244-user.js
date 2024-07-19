'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const users = [
      { first_name: 'Rijvan',last_name : "juneja", role_id : 1, email: 'admin@gmail.com', password: '$2a$10$IFmV4Pz2xWUAPm3FD06RcOoc62UhJF7xG/l02idS1rwWuQEl48n4m', gender : 'male', mobile_number : 9586404030 },
      { first_name: 'Arjit Sihn',last_name : "TIawri", role_id : 2, email: 'user@gmail.com', password: '$2a$10$IFmV4Pz2xWUAPm3FD06RcOoc62UhJF7xG/l02idS1rwWuQEl48n4m', gender : 'male', mobile_number : 5685698564 },
    ];

    await queryInterface.bulkInsert('users', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};