const express = require("express");
const authMiddleware = require("../middleware/authenticatio.middlwware/auth.middleware");
const { addTaskTimeLog, lastLog, getLogsById, runningTask } = require("../controllers/tasks.controllers/tasklogs.controller");
const { reportData } = require("../controllers/tasks.controllers/report.controllers");
const isPermission = require("../middleware/authenticatio.middlwware/isPermission.middleware");
const taskLogRouter = express.Router();

taskLogRouter.post('/api/insert/log',authMiddleware,isPermission(['user']),addTaskTimeLog);
taskLogRouter.post('/api/check/lastlog/:id',authMiddleware, isPermission(['user']),lastLog); 
taskLogRouter.post('/api/logs/:id',authMiddleware,isPermission(['user']),getLogsById); 
taskLogRouter.post('/api/report',authMiddleware, reportData); 
taskLogRouter.post('/api/runningtask',authMiddleware, runningTask); 


module.exports = taskLogRouter;
