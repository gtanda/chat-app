import { createSlice } from "@reduxjs/toolkit";

export const indexPage = createSlice({
    name: "index",
    initialState: { value: true, username: "", password: "", show: false, errorMessage: null },
    reducers: {
        changeView: state => {
            state.value = !state.value;
        },
        changeUserName: (state, action) => {
            state.username = action.payload;
        },
        changePassword: (state, action) => {
            state.password = action.payload;
        },
        setShow: (state, action) => {
            state.show = action.payload;
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        },
    },
});

export const { changeView, changeUserName, changePassword, setShow, setErrorMessage } = indexPage.actions;
export default indexPage.reducer;
