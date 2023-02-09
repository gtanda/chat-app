require("dotenv").config();
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const app = express();
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const helmet = require("helmet");

app.use(cors({ origin: process.env.CLIENT_ADDRESS, credentials: true }));
const redisClient = require("./utils/redis");
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionConfig = session({
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  store: new RedisStore({ client: redisClient }),
  resave: false,
  cookie: {
    secure: process.env.ENVIRONMENT === "production",
    httpOnly: true,
    sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    maxAge: 1000 * 60 * 60,
  },
});

app.use(sessionConfig);

app.use("/api/auth", require("./controllers/auth"));

app.use((err, req, res, next) => {
  if (err.message === "ValidationError") {
    return res.status(400).json({ error: err.error });
  }
  next(err);
});

module.exports = app;
