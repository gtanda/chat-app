import { useRef } from "react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";

const { io } = require("socket.io-client");

const HomePage = () => {
    const socket = io();
    const renderCounter = useRef(0);
    const messageRef = useRef("" || null);
    renderCounter.current++;

    socket.on("connect", () => {
        console.log("connected to server");
        console.log(socket.id);
    });
    const sendMessage = e => {
        e.preventDefault();
        if (messageRef.current.value) {
            socket.send(messageRef.current.value);
        }
        document.getElementById("messageInput").value = "";
    };

    return (
        <div>
            <h1>Home Page {renderCounter.current}</h1>
            <InputGroup size="md">
                <Input pr="4.5rem" type={"text"} placeholder="Enter Message" ref={messageRef} id={"messageInput"} />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={sendMessage}>
                        Send
                    </Button>
                </InputRightElement>
                <div id={"messageOutput"}></div>
            </InputGroup>
        </div>
    );
};

export default HomePage;
