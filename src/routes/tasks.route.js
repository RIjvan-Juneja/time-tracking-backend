const express = require("express");
const { addTask, editTask, getTasks, deleteTask } = require("../controllers/tasks.controllers/task.api.controllers");
const authMiddleware = require("../middleware/authenticatio.middlwware/auth.middleware");
const parser = require("../middleware/cloudnaryfile.middleware");
const isPermission = require("../middleware/authenticatio.middlwware/isPermission.middleware");
const { daycompare, monthlyprogress } = require("../controllers/tasks.controllers/report.controllers");
const taskRouter = express.Router();

// taskRouter.post('/api/getTasks',authMiddleware,isPermission(['ADMIN_VIEW', 'ADMIN_EDIT']),getTasks);

taskRouter.post('/api/getTasks',authMiddleware,getTasks);
taskRouter.post('/api/getTasks/:id',authMiddleware, getTasks); 
taskRouter.post('/api/add',authMiddleware,parser.parser.single('attachment'),addTask);
taskRouter.post('/api/edit',authMiddleware,parser.parser.single('attachment'),editTask);
taskRouter.post('/api/delete/:id',authMiddleware,deleteTask);
taskRouter.post('/api/daycompare',authMiddleware,daycompare);
taskRouter.post('/api/monthlyprogress',authMiddleware,monthlyprogress);

module.exports = taskRouter;
