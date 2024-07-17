const db = require("../models/index");
// const { users , roles} = db;
const users = db.users;
const roles = db.roles;

// console.log(users,roles);

exports.fetchAllUsers = async () => {
  try {
    const allUsers = await users.findAll({
      attributes: ['id', 'first_name', 'last_name', 'email', 'mobile_number', 'created_at'],  
      include : {
        model: roles,
        attributes: ['role_name'],
      }
    });
    return allUsers;
  } catch (error) {
    throw error;
  }
};

exports.fetchUserById = async (id) => {
  try {
    const user = await users.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw error;
  }
};

