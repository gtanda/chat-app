const redisClient = require("../../utils/redis");
const parseFriendList = require("./parseFriendsList");
const onDisconnect = async (socket) => {
  console.log("running onDisconnect");
  await redisClient.hset(`userId:${socket.user.username}`, "connected", false);
  const friendList = await redisClient.lrange(
    `friends:${socket.user.username}`,
    0,
    -1
  );
  const friendRooms = await parseFriendList(friendList).then((friends) =>
    friends.map((f) => f.userid)
  );
  socket.to(friendRooms).emit("connected", false, socket.user.username);
};
