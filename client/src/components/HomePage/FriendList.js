import { Circle, HStack, StackDivider, Text, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const FriendList = () => {
    const friendList = useSelector(state => state.user.friendList);
    const renderFriendList = () => {
        return friendList.map(friend => {
            return (
                <HStack mt={"0.5rem"} mb={"0.5rem"} ml={"0.5rem"} key={friend.username}>
                    <Circle bg={friend.connected ? "green.500" : "red.500"} w={"1rem"} h={"1rem"} />
                    <Text>{friend.username}</Text>
                </HStack>
            );
        });
    };
    return (
        <VStack w={"100%"} align={"start"} divider={<StackDivider borderColor={"gray"} />} spacing={2}>
            {friendList.length > 0 ? renderFriendList() : null}
        </VStack>
    );
};

export default FriendList;
