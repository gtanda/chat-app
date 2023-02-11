import { createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice({
    name: "user",
    initialState: {
        friendList: [
            { username: "Test User", connected: false },
            { username: "Test User 2", connected: true },
        ],
    },
    reducers: {
        setFriendList: (state, action) => {
            state.friendList = action.payload;
        },
    },
});

export const { setFriendList } = userReducer.actions;
export default userReducer.reducer;
