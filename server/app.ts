const port = 3001;

const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    console.log(`message: ${message}`);
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("disconnect");
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
