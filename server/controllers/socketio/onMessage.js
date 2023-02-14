const redisClient = require("../../utils/redis");

const onMessage = (socket, message) => {
  console.log("message", message);
};
module.exports = { onMessage };
