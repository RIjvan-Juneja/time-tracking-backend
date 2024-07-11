const express = require("express");
const taskRouter = require("./tasks.route");
const taskLogRouter = require("./tasklogs.route");
const router = express.Router();

router.use('/task', taskRouter);
router.use('/tasklogs', taskLogRouter);

router.use('/', (req,res) =>{
  res.send('Home Page')
})



module.exports = router;
