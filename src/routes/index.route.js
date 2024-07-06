const express = require("express");
// const userRoutes = require("./render.router");

const router = express.Router();

// router.use('/', userRoutes);
router.use('/', (req,res) =>{
  res.send('Home Page')
})


module.exports = router;
