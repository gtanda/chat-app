const redisClient = require("../../utils/redis");
const addFriend = async (socket, friendName, cb) => {
  if (friendName === socket.user.username) {
    return cb({ error: "You cannot add yourself", done: false });
  }
  const friend = await redisClient.hgetall(`userId:${friendName}`);
  console.log("friend: ", friend);
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

  await redisClient.lpush(
    `friends:${socket.user.username}`,
    [friendName, friend.userId].join(".")
  );

  const newFriend = {
    username: friendName,
    userId: friend.userId,
    connected: friend.connected,
  };
  return cb({ done: true, newFriend });
};

module.exports = { addFriend };
