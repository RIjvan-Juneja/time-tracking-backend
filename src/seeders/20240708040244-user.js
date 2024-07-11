'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

//     # id, first_name, last_name, role_id, email, password, gender, mobile_number, created_at, updated_at, deleted_at
// , Rijvan, Juenja , 1, , sd, male, 9568965865, , , 

    const users = [
      { first_name: 'Rijvan',last_name : "juneja", role_id : 1, email: 'r@r.com', password: 'password123', gender : 'male', mobile_number : 9586404030 },
      { first_name: 'Sahil',last_name : "juneja", role_id : 2, email: 's@s.com', password: 'password123', gender : 'male', mobile_number : 5685698564 },
    ];

    await queryInterface.bulkInsert('users', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};