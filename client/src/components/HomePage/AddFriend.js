import { Button, Heading, HStack, Input, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import AddFriendModal from "./AddFriendModal";

const AddFriend = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <HStack justify={"space-evenly"} w={"100%"}>
            <Heading size={"md"} m={"1rem"}>
                Add Friend
            </Heading>
            <Button w={"2rem"} h={"2rem"} onClick={onOpen}>
                <AddIcon />
            </Button>
            <AddFriendModal isOpen={isOpen} onClose={onClose} />
        </HStack>
    );
};

export default AddFriend;
