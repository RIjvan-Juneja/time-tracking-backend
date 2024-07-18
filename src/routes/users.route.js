const express = require("express");
const { getAllUsers, activeUsers, userProgressChart } = require("../controllers/users/getusers.controller");
const usersRouter = express.Router();

usersRouter.post('/api/userlist', getAllUsers);
usersRouter.post('/api/active/users', activeUsers);
usersRouter.post('/api/progresschart', userProgressChart);


module.exports = usersRouter;
