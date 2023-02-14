import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    Input,
    Text,
    FormLabel,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { changeUsername, setErrorMessage } from "../../../reducers/indexReducer";
import socket from "../../../socketClient";
import { setFriendList } from "../../../reducers/userReducer";

const friendSchema = yup.object({
    friendUsername: yup
        .string()
        .required()
        .min(5, "Friend name must be 5 characters minimum")
        .max(15, "Friend name must be 15 characters maximum"),
});

const AddFriendModal = ({ onClose, isOpen }) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(friendSchema),
    });

    const [friendName, setFriendName] = useState("");

    const dispatch = useDispatch();
    const currentFriendList = useSelector(state => state.user.friendList);
    const closeModal = useCallback(() => {
        dispatch(setErrorMessage(""));
        dispatch(changeUsername(""));
        if (errors && errors?.friendUsername?.message) {
            errors.friendUsername.message = null;
            setFriendName("");
        }
        onClose();
    });

    const errorMessage = useSelector(state => state.index.errorMessage);
    const submitHandler = () => {
        const friendUsername = friendName.replace(/\s/g, ""); // remove whitespace
        socket.emit("addFriend", friendUsername, ({ error, done, newFriend }) => {
            if (done) {
                dispatch(setFriendList([newFriend, ...currentFriendList]));
                closeModal();
                return;
            }
            dispatch(setErrorMessage(error));
        });
    };

    const isError = friendName.length < 5 || friendName.length > 15;

    return (
        <Modal isOpen={isOpen} onClose={closeModal} isCentered={true}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Friend</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit(submitHandler)}>
                    <ModalBody>
                        <Text color={"red.500"} mb={3}>
                            {errorMessage}
                        </Text>
                        <FormControl isInvalid={isError}>
                            <FormLabel>Friend Name</FormLabel>
                            <Input
                                {...register("friendUsername")}
                                autoComplete={"off"}
                                onChange={e => setFriendName(e.target.value)}
                                value={friendName}
                                placeholder={"Enter friend's username"}
                                type={"text"}
                            />
                        </FormControl>
                        {errors ? (
                            <Text color={"red.500"} mb={3}>
                                {errors?.friendUsername?.message}
                            </Text>
                        ) : null}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="teal" type={"submit"}>
                            Submit
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default AddFriendModal;
