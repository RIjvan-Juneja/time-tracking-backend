const express = require("express");
const { addTask, editTask, getTasks, deleteTask } = require("../controllers/tasks.controllers/task.api.controllers");
const authMiddleware = require("../middleware/authenticatio.middlwware/auth.middleware");
const taskRouter = express.Router();

taskRouter.get('/api/getTasks',authMiddleware,getTasks);
taskRouter.get('/api/getTasks/:id',authMiddleware, getTasks); 
taskRouter.post('/api/add',authMiddleware,addTask);
taskRouter.post('/api/edit',authMiddleware,editTask);
taskRouter.post('/api/delete/:id',authMiddleware,deleteTask);

module.exports = taskRouter;
