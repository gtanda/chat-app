const redisClient = require("../utils/redis");

module.exports.addFriend = async (socket, friendName, cb) => {
  if (friendName === socket.user.username) {
    return cb({ error: "You cannot add yourself", done: false });
  }
  const friend = await redisClient.hgetall(`userId:${friendName}`);
  if (!friend) {
    return cb({ error: "User not found", done: false });
  }

  const friendList = await redisClient.lrange(
    `friends:${socket.user.username}`,
    0,
    -1
  );

  if (friendList.includes(friend)) {
    return cb({ error: "User already in friend list", done: false });
  }

  await redisClient.lpush(`friends:${socket.user.username}`, [
    friendName,
    friend.userId,
  ]);
  return cb({ done: true });
};

module.exports.initializeUser = async (socket) => {
  socket.user = { ...socket.request.session.user };
  socket.join(socket.user.userId);
  await redisClient.hset(
    `userId:${socket.user.username}`,
    "userId",
    socket.user.userId,
    "connected",
    true
  );
  const friendList = await redisClient.lrange(
    `friends:${socket.user.username}`,
    0,
    -1
  );
  socket.emit("friends", friendList);
};

module.exports.onDisconnect = async (socket) => {
  await redisClient.hset(`userId:${socket.user.username}`, "connected", false);
};
