const express = require("express");
const { getAllUsers } = require("../controllers/users/getusers.controller");
const usersRouter = express.Router();

usersRouter.post('/api/userlist', getAllUsers);

module.exports = usersRouter;
