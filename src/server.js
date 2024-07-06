const express = require("express");
const useRouter = require('./routes/index.route');
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

app.use(useRouter);

const server = app.listen(PORT, (err)=>{
  if(err){
      console.log("connection error");
  } else {
      console.log(`Server is : http://${HOST}:${PORT}/`);
  }
})
