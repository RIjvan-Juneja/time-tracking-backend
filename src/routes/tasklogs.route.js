const express = require("express");
const authMiddleware = require("../middleware/authenticatio.middlwware/auth.middleware");
const { addTaskTimeLog, lastLog, getLogsById } = require("../controllers/tasks.controllers/tasklogs.controller");
const { reportData } = require("../controllers/tasks.controllers/report.controllers");
const taskLogRouter = express.Router();

taskLogRouter.post('/api/insert/log',authMiddleware,addTaskTimeLog);
taskLogRouter.post('/api/check/lastlog/:id',authMiddleware, lastLog); 
taskLogRouter.post('/api/logs/:id',authMiddleware, getLogsById); 
taskLogRouter.post('/api/report',authMiddleware, reportData); 

module.exports = taskLogRouter;
