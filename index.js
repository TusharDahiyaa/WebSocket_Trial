const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const PORT = process.env.PORT || 8080;

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {},
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected.`);

  socket.on("sendMessage", (data) => {
    io.emit("receivedMessage", data);
  });

  //   When a client disconnects, perform this
  socket.on("disconnect", () => {
    console.log(`User ${socket.id} has left the chat`);
  });
});

io.engine.on("connection_error", (err) => {
  console.log(err.req);
  console.log(err.code);
  console.log(err.message);
  console.log(err.context);
});

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
