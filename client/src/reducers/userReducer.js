import { createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice({
    name: "user",
    initialState: {
        friendList: [],
        messages: [],
        currentFriendIdx: 0,
    },
    reducers: {
        setFriendList: (state, action) => {
            if (action.payload.length === 0) return;
            state.friendList = action.payload;
        },
        setMessages: (state, action) => {
            if (action.payload.length === 0) return;
            state.messages.push(action.payload);
        },
        setCurrentFriendIdx: (state, action) => {
            state.currentFriendIdx = action.payload;
        },
    },
});

export const { setFriendList, setMessages, setCurrentFriendIdx } = userReducer.actions;
export default userReducer.reducer;
