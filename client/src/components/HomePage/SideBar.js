import { ChatIcon } from "@chakra-ui/icons";
import {
    Button,
    Divider,
    Heading,
    HStack,
    VStack,
    Text,
    Circle,
    List,
    ListItem,
    GridItem,
    Grid,
    StackDivider,
} from "@chakra-ui/react";

const SideBar = () => {
    return (
        <VStack>
            <HStack justify={"space-around"} w={"100%"}>
                <Heading size={"md"}>Search</Heading>
                <Button>
                    <ChatIcon />
                </Button>
            </HStack>
            <Divider borderColor={"gray"} />
            <VStack w={"100%"} align={"start"} divider={<StackDivider borderColor={"gray"} />} spacing={2}>
                <HStack mt={"0.5rem"} mb={"0.5rem"} ml={"0.5rem"}>
                    <Circle bg={"red.500"} w={"1rem"} h={"1rem"} />
                    <Text>Test User</Text>
                </HStack>
                <HStack mt={"0.5rem"} mb={"0.5rem"} ml={"0.5rem"}>
                    <Circle bg={"green.500"} w={"1rem"} h={"1rem"} />
                    <Text>Test User 2</Text>
                </HStack>
            </VStack>
        </VStack>
    );
};

export default SideBar;
