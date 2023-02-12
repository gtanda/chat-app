require("dotenv").config();
const session = require("express-session");
const redisClient = require("../utils/redis");
const RedisStore = require("connect-redis")(session);

const sessionMiddleware = session({
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  store: new RedisStore({ client: redisClient }),
  resave: false,
  cookie: {
    secure: process.env.NODE.ENV === "production",
    httpOnly: true,
    sameSite: process.env.NODE.ENV === "production" ? "none" : "lax",
    maxAge: 1000 * 60 * 60,
  },
});

const corsConfig = { origin: process.env.CLIENT_ADDRESS, credentials: true };

const wrap = (expressMiddleware) => (socket, next) =>
  expressMiddleware(socket.request, {}, next);

const authorizedUser = (socket, next) => {
  if (!socket.request.session || !socket.request.session.user) {
    return next(new Error("Unauthorized"));
  } else {
    socket.user = { ...socket.request.session.user };
    redisClient.hset(
      `userId:${socket.user.username}`,
      "userId",
      socket.user.userId
    );
    next();
  }
};

module.exports = { sessionMiddleware, corsConfig, wrap, authorizedUser };
