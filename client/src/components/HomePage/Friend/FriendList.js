import { StackDivider, TabPanels, Tabs, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Friend from "./Friend";
import { useState } from "react";

const FriendList = () => {
    const [friendIdx, setFriendIdx] = useState(0);
    const friendList = useSelector(state => state.user.friendList);
    console.log(friendIdx);

    const renderFriendList = () => {
        if (friendList.length === 0) return null;
        return friendList.map(f => <Friend key={f.userId} friend={f} />);
    };

    return (
        <VStack w={"100%"} divider={<StackDivider borderColor={"gray"} />} spacing={2}>
            <TabPanels>
                <Tabs onChange={idx => setFriendIdx(idx)}>{renderFriendList()}</Tabs>
            </TabPanels>
        </VStack>
    );
};

export default FriendList;
