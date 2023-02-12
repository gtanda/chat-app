const redisClient = require("./redis");
const rateLimiter = (secondsLimit, rateLimit) => async (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const response = await redisClient
    .multi()
    .incr(ip)
    .expire(ip, secondsLimit)
    .exec();
  if (response[0][1] > rateLimit) {
    return res
      .status(429)
      .json({
        loggedIn: false,
        error: `Too many requests, try again in ${secondsLimit} seconds`,
      });
  }
  next();
};

module.exports = rateLimiter;
