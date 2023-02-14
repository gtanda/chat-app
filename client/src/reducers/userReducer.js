import { createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice({
    name: "user",
    initialState: {
        friendList: [],
    },
    reducers: {
        setFriendList: (state, action) => {
            if (action.payload.length === 0) return;
            state.friendList = action.payload;
        },
    },
});

export const { setFriendList } = userReducer.actions;
export default userReducer.reducer;
