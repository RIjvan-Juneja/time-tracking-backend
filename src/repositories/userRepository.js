const db = require("../models/index");
const users = db.users;

exports.fetchAllUsers = async () => {
  try {
    const allUsers = await users.findAll();
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

