import { useEffect } from "react";
import { GridItem, Grid, Tabs } from "@chakra-ui/react";
import SideBar from "./SideBar";
import Chat from "./Chat";
import socket from "../../socketClient";
import { useDispatch } from "react-redux";
import { setUser } from "../../reducers/indexReducer";
import { setFriendList } from "../../reducers/userReducer";

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        socket.connect();
        socket.on("friends", friends => {
            console.log(friends, "friends");
            dispatch(setFriendList(friends));
        });
        socket.on("connect_error", () => {
            dispatch(setUser({ loggedIn: false }));
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
