import { StackDivider, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Friend from "./Friend";

const FriendList = () => {
    const friendList = useSelector(state => state.user.friendList);
    const renderFriendList = () => {
        return friendList.map(friend => <Friend key={friend} friend={friend} />);
    };
    console.log("friendlist", friendList);
    return (
        <VStack w={"100%"} align={"start"} divider={<StackDivider borderColor={"gray"} />} spacing={2}>
            {renderFriendList()}
        </VStack>
    );
};

export default FriendList;
