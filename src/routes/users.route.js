const express = require("express");
const { getAllUsers, activeUsers, userProgressChart } = require("../controllers/users/getusers.controller");
const authMiddleware = require("../middleware/authenticatio.middlwware/auth.middleware");
const isPermission = require("../middleware/authenticatio.middlwware/isPermission.middleware");
const usersRouter = express.Router();

usersRouter.post('/api/userlist',authMiddleware,isPermission(['admin']), getAllUsers);
usersRouter.post('/api/active/users',authMiddleware,isPermission(['admin']), activeUsers);
usersRouter.post('/api/progresschart',authMiddleware,isPermission(['admin']), userProgressChart);

module.exports = usersRouter;
