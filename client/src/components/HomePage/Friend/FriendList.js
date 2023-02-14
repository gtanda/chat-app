import { StackDivider, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Friend from "./Friend";
import { useEffect } from "react";

const FriendList = () => {
    const friendList = useSelector(state => state.user.friendList);

    const renderFriendList = () => {
        if (friendList.length === 0) return null;
        return friendList.map(f => <Friend key={f.userId} friend={f} />);
    };

    return (
        <VStack w={"100%"} align={"start"} divider={<StackDivider borderColor={"gray"} />} spacing={2}>
            {renderFriendList()}
        </VStack>
    );
};

export default FriendList;
