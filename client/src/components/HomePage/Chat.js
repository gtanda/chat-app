import { TabPanel, VStack, TabPanels, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Chat = () => {
    const friendList = useSelector(state => state.user.friendList);
    const messages = useSelector(state => state.user.messages);
    return friendList.length > 0 ? (
        <VStack justify={"end"} h={"100%"}>
            <TabPanels overflowY={"scroll"}>
                <Text as={TabPanel}>F1</Text>
            </TabPanels>
        </VStack>
    ) : (
        <VStack justify={"center"} w={"100%"} textAlign={"center"} mt={"8rem"} fontSize={"2rem"}>
            <TabPanels>
                <TabPanel>Add some friends to start chatting!</TabPanel>
            </TabPanels>
        </VStack>
    );
};

export default Chat;
