import { StackDivider, TabPanels, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Friend from "./Friend";

const FriendList = () => {
    const friendList = useSelector(state => state.user.friendList);
    const renderFriendList = () => {
        if (friendList.length === 0) return null;
        return friendList.map(f => <Friend key={f.userId} friend={f} />);
    };

    return (
        <VStack w={"100%"} divider={<StackDivider borderColor={"gray"} />} spacing={2}>
            <TabPanels>{renderFriendList()}</TabPanels>
        </VStack>
    );
};

export default FriendList;
