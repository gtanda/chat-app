import { useEffect } from "react";
import { GridItem, Grid, Tabs } from "@chakra-ui/react";
import SideBar from "./SideBar";
import Chat from "./Chat";
import socket from "../../socketClient";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../reducers/indexReducer";
import { setFriendList } from "../../reducers/userReducer";

const HomePage = () => {
    const dispatch = useDispatch();
    const currentFriends = useSelector(state => state.user.friendList);
    useEffect(() => {
        socket.connect();
        socket.on("friends", friends => dispatch(setFriendList(friends)));
        socket.on("connect_error", () => dispatch(setUser({ loggedIn: false })));
        socket.on("connected", (status, username) => {
            console.log("in connect");
            const newFriends = currentFriends.map(friend => {
                console.log("friend", friend);
                console.log("username", username);
                if (friend.username === username) {
                    console.log("in here");
                    friend.connected = status;
                }
                return friend;
            });
            dispatch(setFriendList(newFriends));
        });
        return () => socket.off("connect_error");
    }, [setUser, setFriendList]);

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
