const express = require("express");
const cors = require("cors");
const useRouter = require('./routes/index.route');
const {Server} = require('socket.io')
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

require('dotenv').config();

const app = express();
app.use(cors({ credentials: true, origin: ["http://localhost:5173", "http://192.168.22.71:5173"] }));
// app.use(cors({ credentials: true, origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(useRouter);

const server = app.listen(PORT, (err) => {
  if (err) {
    console.log("connection error");
  } else {
    console.log(`Server is : http://${HOST}:${PORT}/`);
  }
})

let count = 0;
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173','http://192.168.22.71:5173'],
    credentials: true
  }
});


io.on('connection', (socket) => {
  count++
  socket.on('req_for_log', (id) => {
    socket.broadcast.emit('res_for_log', id);
  })
  console.log("Soket server is running", count ,socket.id)
});