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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { changeUsername } from "../../reducers/indexReducer";

const friendSchema = yup.object({
    friendUsername: yup.string().required().min(5).max(15),
});

const AddFriendModal = ({ onClose, isOpen }) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(friendSchema),
    });

    const dispatch = useDispatch();
    const errorMessage = useSelector(state => state.index.errorMessage);
    const username = useSelector(state => state.index.username);
    const submitHandler = () => {
        const friendUsername = username.replace(/\s/g, ""); // remove whitespace
        onClose();
    };

    const isError = username.length < 5 || username.length > 15;

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
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
                                onChange={e => dispatch(changeUsername(e.target.value.trim()))}
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
