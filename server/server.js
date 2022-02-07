const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const randomColor = require("randomcolor");

const app = express();

app.use(express.static(`${__dirname}/../client`)); // Directory for file location

const server = http.createServer(app);
const io = socketio(server); // It just works as a wrapper for server, every request which is related to socketio it will  filter out else all it will pass it on to server (Express Application)

io.on("connection", (sock) => {
  // Each time a person tries to connect we get new invocation of this instance.
  const color = randomColor();
  sock.emit("message", "You are connected");
  sock.on("message", (text) => io.emit("message", text));
  sock.on("turn", ({ x, y }) => io.emit("turn", { x, y, color }));
});

server.on("error", (err) => {
  console.error(err);
});

server.listen(8080, () => {
  console.log("Serving...");
});
