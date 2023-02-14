import { Divider, VStack } from "@chakra-ui/react";
import FriendList from "./Friend/FriendList";
import AddFriend from "./Friend/AddFriend";
import UserBar from "./UserBar";

const SideBar = () => {
    return (
        <VStack h={"100%"}>
            <AddFriend />
            <Divider borderColor={"gray"} />
            <FriendList />
            <UserBar justify={"end"} />
        </VStack>
    );
};

export default SideBar;
