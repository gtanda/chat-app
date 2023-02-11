import { Divider, VStack } from "@chakra-ui/react";
import FriendList from "./FriendList";
import AddFriend from "./AddFriend";

const SideBar = () => {
    return (
        <VStack>
            <AddFriend />
            <Divider borderColor={"gray"} />
            <FriendList />
        </VStack>
    );
};

export default SideBar;
