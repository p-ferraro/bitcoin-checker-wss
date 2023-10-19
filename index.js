
import fetch from 'node-fetch'
import express from "express"
import http from "http"
import {Server} from "socket.io"
import cors from "cors"


const app = express();
app.use(cors({
  origin: "https://bitcoin-info-client.vercel.app/"
}));
app.get('/', function (req, res) {
  res.render('index', {});
});
const server = http.createServer(app);
let price = "";

async function fetchBitcoin() {
  const response = await fetch(
    "https://rest.coinapi.io/v1/exchangerate/BTC/USD/apikey-5674DB1C-B3EB-4C9E-8A52-7B8FAF180FA5",
  );
  const data = await response.json();
  const parse = parseInt(data.rate);
  const roundedPrice = Math.floor(parse);
  const finalprice = roundedPrice.toString();
  price = finalprice;
  console.log(price);
}

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
    console.log(`Emitting Price:${price}`);
  }, 30 * 1000);
});

server.listen(3002, () => {
  console.log("SERVER RUNNING on 3002");
});
