import { useRef } from "react";
import { GridItem, Grid, Tabs } from "@chakra-ui/react";
import SideBar from "./SideBar";
import Chat from "./Chat";

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
        <Grid templateColumns={"repeat(5, 1fr)"} h={"100vh"} as={Tabs}>
            <GridItem colSpan={1} borderRight={"0.1rem solid gray"}>
                <SideBar />
            </GridItem>
            <GridItem colSpan={4}>
                <Chat />
            </GridItem>
        </Grid>
    );
};

export default HomePage;
