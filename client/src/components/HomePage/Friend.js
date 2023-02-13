import { Circle, HStack, Text } from "@chakra-ui/react";

const Friend = ({ friend }) => {
    return (
        <HStack mt={"0.5rem"} mb={"0.5rem"} ml={"0.5rem"} key={friend.username}>
            <Circle bg={friend.connected ? "green.500" : "red.500"} w={"1rem"} h={"1rem"} />
            <Text>{friend.username}</Text>
        </HStack>
    );
};

export default Friend;
