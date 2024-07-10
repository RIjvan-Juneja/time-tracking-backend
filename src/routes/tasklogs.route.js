const express = require("express");
const authMiddleware = require("../middleware/authenticatio.middlwware/auth.middleware");
const { addTaskTimeLog, lastLog } = require("../controllers/tasks.controllers/tasklogs.controller");
const taskLogRouter = express.Router();

taskLogRouter.post('/api/insert/log',authMiddleware,addTaskTimeLog);
taskLogRouter.post('/api/check/lastlog',authMiddleware, lastLog); 
// taskRouter.post('/api/add',authMiddleware,parser.parser.single('attachment'),addTask);
// taskRouter.post('/api/edit',authMiddleware,editTask);
// taskRouter.post('/api/delete/:id',authMiddleware,deleteTask);

module.exports = taskLogRouter;
