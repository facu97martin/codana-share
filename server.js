import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.send("Escriba un id de session en la url. Ejemplo: localhost:3000/1234");
});

app.get("/:sessionId", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  socket.on("new-connection", (sessionId) => {
    io.emit("check-existing-message-" + sessionId, "check");
  });

  socket.on("main-input-edit", (message) => {
    io.emit("main-input-edit-" + message.session, message.value);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
