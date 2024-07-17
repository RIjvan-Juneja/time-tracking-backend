const express = require("express");
const taskRouter = require("./tasks.route");
const taskLogRouter = require("./tasklogs.route");
const authRouter = require("./auth.route");
const usersRouter = require("./users.route");
const router = express.Router();

router.use('/task', taskRouter);
router.use('/tasklogs', taskLogRouter);
router.use('/auth', authRouter);
router.use('/users', usersRouter);


router.use('/', (req,res) =>{
  res.send('Home Page')
})



module.exports = router;
