const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const path = require("path");

app.use(cors());
app.use(express.json());

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
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
