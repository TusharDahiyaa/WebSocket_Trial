const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const PORT = process.env.PORT || 8080;

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected.`);

  socket.on("sendMessage", (data) => {
    socket.broadcast.emit("receivedMessage", data);
  });

  //   When a client disconnects, perform this
  socket.on("disconnect", () => {
    console.log(`User ${socket.id} has left the chat`);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
