import { TabPanel, VStack, TabPanels, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import MessageBox from "./MessageBox";

const Chat = () => {
    const friendList = useSelector(state => state.user.friendList);
    const messages = useSelector(state => state.user.messages);
    const currentFriendIdx = useSelector(state => state.user.currentFriendIdx);
    const renderChat = () => {
        return friendList.map(friend => {
            return (
                <VStack flexDir={"column-reverse"} as={TabPanel} key={`chat:${friend.username}`} w-={"100%"}>
                    {messages
                        .filter(msg => msg.to === friend.username || msg.from === friend.username)
                        .map((message, idx) => {
                            return (
                                <Text key={`msg:${friend.username}.${idx}`} fontSize="lg">
                                    {message.content}
                                </Text>
                            );
                        })}
                    }
                    <MessageBox />
                </VStack>
            );
        });
    };
    return friendList.length > 0 ? (
        <VStack justify={"end"} h={"100%"}>
            <TabPanels overflowY={"scroll"}>{renderChat()}</TabPanels>
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
