import { TabPanel, VStack, TabPanels, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import MessageBox from "./MessageBox";
import { useEffect, useRef } from "react";

const Chat = () => {
    const friendList = useSelector(state => state.user.friendList);
    const messages = useSelector(state => state.user.messages);
    const scroll = useRef();

    useEffect(() => {
        if (scroll.current) {
            scroll.current.scrollTop = scroll.current.scrollHeight;
        }
    });

    const renderChat = () => {
        return friendList.map(friend => {
            return (
                <VStack as={TabPanel} key={`chat:${friend.username}`} w={"100%"}>
                    {messages
                        .filter(msg => msg.to === friend.username || msg.from === friend.username)
                        .map((message, idx) => {
                            return (
                                <Text
                                    m={
                                        message.to === friend.userId
                                            ? "1rem 0 0 auto !important"
                                            : "1rem auto 0 0 !important"
                                    }
                                    autoComplete={"off"}
                                    maxW={"50%"}
                                    key={`msg:${friend.username}.${idx}`}
                                    fontSize="lg"
                                    color={"black"}
                                    bg={message.to === friend.userId ? "blue.100" : "green.100"}
                                    borderRadius={"0.35rem"}
                                    p={"0.25rem"}
                                >
                                    From: {message.from} {message.content}
                                </Text>
                            );
                        })}
                    }
                </VStack>
            );
        });
    };
    return friendList.length > 0 ? (
        <VStack justify={"end"} h={"100%"}>
            <TabPanels overflowY={"scroll"} ref={scroll}>
                {renderChat()}
            </TabPanels>
            <MessageBox />
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
