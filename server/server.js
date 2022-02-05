const http = require("http");
const express = require("express");

const app = express();

app.use(express.static(`${__dirname}/../client`)); // Directory for file location

const server = http.createServer(app);

server.on("error", (err) => {
  console.error(err);
});

server.listen(8080, () => {
  console.log("Serving...");
});
