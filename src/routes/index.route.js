const express = require("express");
const taskRouter = require("./tasks.route");
const router = express.Router();

router.use('/task', taskRouter);
router.use('/', (req,res) =>{
  res.send('Home Page')
})



module.exports = router;
