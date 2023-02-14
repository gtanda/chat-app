require("dotenv").config();
require("express-async-errors");
const http = require("http");
const PORT = require("./utils/config").PORT;
const express = require("express");
const cors = require("cors");
const app = express();
const helmet = require("helmet");
const { Server } = require("socket.io");
const { addFriend } = require("./controllers/socketio/addFriend");
const { initializeUser } = require("./controllers/socketio/initializeUser");
const { onDisconnect } = require("./controllers/socketio/onDisconnect");
const { onMessage } = require("./controllers/socketio/onMessage");
const {
  sessionMiddleware,
  wrap,
  corsConfig,
  authorizedUser,
} = require("./middleware/serverMiddleware");
app.use(cors(corsConfig));
const server = http.createServer(app);

const io = new Server(server, { cors: corsConfig });

app.use(sessionMiddleware);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", require("./controllers/auth"));
io.use(wrap(sessionMiddleware));
io.use(authorizedUser);
io.on("connection", (socket) => {
  initializeUser(socket)
    .then(() => console.log(`User ${socket.user.username} connected`))
    .catch((err) => console.log(err));
  socket.on("message", (message) => onMessage(socket, message));
  socket.on("addFriend", (friendName, cb) => addFriend(socket, friendName, cb));
  socket.on("disconnect", () => onDisconnect(socket));
});

app.use((err, req, res, next) => {
  if (err.message === "ValidationError") {
    return res.status(400).json({ error: err.error });
  }
  next(err);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
