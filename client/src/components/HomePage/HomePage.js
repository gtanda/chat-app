import { useEffect } from "react";
import { GridItem, Grid, Tabs } from "@chakra-ui/react";
import SideBar from "./SideBar";
import Chat from "./Chat/Chat";
import socket from "../../socketClient";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../reducers/indexReducer";
import { setCurrentFriendIdx, setFriendList, setMessages } from "../../reducers/userReducer";

const HomePage = () => {
    const dispatch = useDispatch();
    const currentFriends = useSelector(state => state.user.friendList);
    const messages = useSelector(state => state.user.messages);
    useEffect(() => {
        socket.connect();
        socket.on("friends", friends => dispatch(setFriendList(friends)));
        socket.on("messages", messages => {
            console.log("hit");
            dispatch(setMessages(messages));
        });
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
            socket.off("messages");
        };
    }, [dispatch, currentFriends, messages]);

    return (
        <Grid
            templateColumns={"repeat(5, 1fr)"}
            h={"100vh"}
            as={Tabs}
            onChange={idx => dispatch(setCurrentFriendIdx(idx))}
        >
            <GridItem colSpan={1} borderRight={"0.1rem solid gray"}>
                <SideBar />
            </GridItem>
            <GridItem colSpan={4} maxH={"100vh"}>
                <Chat overflowY={"scroll"} />
            </GridItem>
        </Grid>
    );
};

export default HomePage;
