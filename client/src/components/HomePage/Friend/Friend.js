import { Circle, HStack, Text } from "@chakra-ui/react";

const Friend = ({ friend }) => {
    if (!friend) return null;
    return (
        <HStack mt={"0.5rem"} mb={"0.5rem"} ml={"0.5rem"} key={friend.username}>
            <Circle bg={Boolean(friend.connected) === true ? "green.500" : "red.500"} w={"1rem"} h={"1rem"} />
            <Text>{friend.username}</Text>
        </HStack>
    );
};

export default Friend;
