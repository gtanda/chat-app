const redisClient = require("../utils/redis");

module.exports.addFriend = async (socket, friendName, cb) => {
  if (friendName === socket.user.username) {
    return cb({ error: "You cannot add yourself", done: false });
  }
  const friendId = await redisClient.hget(`userId:${friendName}`, "userId");
  if (!friendId) {
    return cb({ error: "User not found", done: false });
  }

  const friendList = await redisClient.lrange(
    `friends:${socket.user.username}`,
    0,
    -1
  );

  if (friendList.includes(friendName)) {
    return cb({ error: "User already in friend list", done: false });
  }

  await redisClient.lpush(`friends:${socket.user.username}`, friendName);
  return cb({ done: true });
};

module.exports.initializeUser = async (socket) => {
  socket.user = { ...socket.request.session.user };
  await redisClient.hset(
    `userId:${socket.user.username}`,
    "userId",
    socket.user.userId
  );
  const friendList = await redisClient.lrange(
    `friends:${socket.user.username}`,
    0,
    -1
  );
  console.log(friendList);
  socket.emit("friends", friendList);
};
