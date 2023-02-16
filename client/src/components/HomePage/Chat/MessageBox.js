import { Button, FormControl, HStack, Input, Text } from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../../socketClient";
import { setMessages } from "../../../reducers/userReducer";

const schema = yup.object({
    message: yup.string().required().max(500),
});

const MessageBox = () => {
    const { handleSubmit, register } = useForm({
        resolver: yupResolver(schema),
    });
    const [textMessage, setTextMessage] = useState("");
    const msgTo = useSelector(state => state.user.friendList[state.user.currentFriendIdx].username);
    const msgFrom = useSelector(state => state.index.user.username);

    const dispatch = useDispatch();

    const onSubmit = msg => {
        const message = { from: msgFrom, to: msgTo, content: msg.message };
        socket.emit("message", message);
        dispatch(setMessages(message));
        setTextMessage("");
    };

    return (
        <FormControl isRequired>
            <form onSubmit={handleSubmit(onSubmit)}>
                <HStack m={"1rem"}>
                    <Input
                        {...register("message")}
                        type={"text"}
                        placeholder={"Enter message..."}
                        value={textMessage}
                        onChange={e => setTextMessage(e.target.value)}
                    />
                    <Button type={"submit"}>Send</Button>
                </HStack>
            </form>
        </FormControl>
    );
};

export default MessageBox;
