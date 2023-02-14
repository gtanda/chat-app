import { useEffect } from "react";
import { GridItem, Grid, Tabs } from "@chakra-ui/react";
import SideBar from "./SideBar";
import Chat from "./Chat";
import socket from "../../socketClient";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../reducers/indexReducer";
import { setFriendList } from "../../reducers/userReducer";
import friendList from "./FriendList";

const HomePage = () => {
    const dispatch = useDispatch();
    const currentFriends = useSelector(state => state.user.friendList);
    useEffect(() => {
        socket.connect();
        socket.on("friends", friends => dispatch(setFriendList(friends)));
        socket.on("connected", (status, username) => {
            const newFriends = currentFriends.map(friend => {
                const f = { ...friend };
                if (friend.username === username) {
                    f.connected = status;
                }
                return f;
            });
            dispatch(setFriendList(newFriends));
        });
        socket.on("connect_error", () => dispatch(setUser({ loggedIn: false })));
        return () => {
            socket.off("connect_error");
            socket.off("connected");
            socket.off("friends");
        };
    }, [friendList, dispatch, currentFriends]);

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
