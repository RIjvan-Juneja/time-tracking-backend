const express = require("express");
const { addTask, editTask, getTasks, deleteTask } = require("../controllers/tasks.controllers/task.api.controllers");
const authMiddleware = require("../middleware/authenticatio.middlwware/auth.middleware");
const parser = require("../middleware/cloudnaryfile.middleware");
const taskRouter = express.Router();

taskRouter.post('/api/getTasks',authMiddleware,getTasks);
taskRouter.post('/api/getTasks/:id',authMiddleware, getTasks); 
taskRouter.post('/api/add',authMiddleware,parser.parser.single('attachment'),addTask);
taskRouter.post('/api/edit',authMiddleware,editTask);
taskRouter.post('/api/delete/:id',authMiddleware,deleteTask);

module.exports = taskRouter;
