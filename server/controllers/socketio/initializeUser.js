const redisClient = require("../../utils/redis");
const parseFriendList = require("./parseFriendsList");
const initializeUser = async (socket) => {
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

  const parsedFriendList = await parseFriendList(friendList);
  const friendRooms = parsedFriendList.map((f) => f.userId);
  if (friendRooms.length > 0) {
    socket.to(friendRooms).emit("connected", true, socket.user.username);
  }

  socket.emit("friends", parsedFriendList);
};

module.exports = { initializeUser };
