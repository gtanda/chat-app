import { Circle, HStack, Tab, Text } from "@chakra-ui/react";

const Friend = ({ friend }) => {
    if (!friend) return null;
    return (
        <Tab w={"100%"} justify={"start"}>
            <HStack w={"100%"} display={"flex"} mb={"0.5rem"} key={friend.username}>
                <Circle bg={Boolean(friend.connected) === true ? "green.500" : "red.500"} w={"1rem"} h={"1rem"} />
                <Text>{friend.username}</Text>
            </HStack>
        </Tab>
    );
};

export default Friend;
