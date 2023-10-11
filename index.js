const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");



app.use(cors());
const server = http.createServer(app);
let price = "";

setInterval(function () {
  let date = new Date();
  let now_utc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );

  let utc_date = new Date(now_utc);
  console.log(utc_date.getHours());

  if (utc_date.getHours() >= 15 && utc_date.getHours() <= 22) {
    fetchBitcoin();
    console.log(utc_date.getHours());
    console.log("Fetched Price");
  } else {
    return;
  }
}, 300 * 1000);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connect", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.emit("price", `${price}`);
  setInterval(function () {
    socket.emit("price", `${price}`);
  }, 300 * 1000);
});

server.listen(3002, () => {
  console.log("SERVER RUNNING on 3002");
});
