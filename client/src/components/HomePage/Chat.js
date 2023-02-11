import { TabPanel, VStack, TabPanels } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Chat = () => {
    const friendList = useSelector(state => state.user.friendList);
    return friendList.length > 0 ? (
        <VStack>
            <TabPanels>
                <TabPanel>F1</TabPanel>
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
