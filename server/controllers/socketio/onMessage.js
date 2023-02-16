const redisClient = require("../../utils/redis");

const onMessage = async (socket, message) => {
  message.from = socket.user.userId;
  const { from, to, content } = message;
  const messageContent = [to, from, content].join(".");

  await redisClient.lpush(`chat:${from}`, messageContent);
  await redisClient.lpush(`chat:${to}`, messageContent);

  socket.to(to).emit("messages", message);
};
module.exports = { onMessage };
