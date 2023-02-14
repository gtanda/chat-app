import { createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice({
    name: "user",
    initialState: {
        friendList: [],
        messages: [],
    },
    reducers: {
        setFriendList: (state, action) => {
            if (action.payload.length === 0) return;
            state.friendList = action.payload;
        },
        setMessages: (state, action) => {
            if (action.payload.length === 0) return;
            state.messages = action.payload;
        },
    },
});

export const { setFriendList, setMessages } = userReducer.actions;
export default userReducer.reducer;
