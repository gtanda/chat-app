import { useEffect } from "react";
import { GridItem, Grid, Tabs } from "@chakra-ui/react";
import SideBar from "./SideBar";
import Chat from "./Chat";
import socket from "../../socketClient";
import { useDispatch } from "react-redux";
import { setUser } from "../../reducers/indexReducer";

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        socket.connect();
        socket.on("connect_error", () => {
            dispatch(setUser({ loggedIn: false }));
            console.log("error");
        });
        return () => {
            socket.off("connect_error");
        };
    }, [setUser]);

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
