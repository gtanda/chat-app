import { Circle, Button, HStack, Text, VStack, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const UserBar = () => {
    const user = useSelector(state => state.index.user);
    return (
        <VStack h={"100%"} justify={"end"} w={"100%"}>
            <Flex w={"100%"} borderTop={"0.1rem solid gray"} justify={"space-between"}>
                <HStack m={"1rem"} justify={"center"}>
                    <Circle bg={"green.500"} w={"1rem"} h={"1rem"} />
                    <Text>{user.username}</Text>
                </HStack>
                <Button bg={"teal"} size={"sm"} m={"1rem"}>
                    Logout
                </Button>
            </Flex>
        </VStack>
    );
};

export default UserBar;
