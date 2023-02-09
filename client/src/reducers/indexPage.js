import { createSlice } from "@reduxjs/toolkit";

export const indexPage = createSlice({
    name: "index",
    initialState: {
        changePage: true,
        username: "",
        password: "",
        show: false,
        errorMessage: null,
        loggedIn: false,
        user: {},
    },
    reducers: {
        changeView: state => {
            state.changePage = !state.changePage;
        },
        changeUserName: (state, action) => {
            state.username = action.payload;
        },
        changePassword: (state, action) => {
            state.password = action.payload;
        },
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setShow: (state, action) => {
            state.show = action.payload;
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        },
    },
});

export const { changeView, changeUserName, changePassword, setShow, setErrorMessage, setLoggedIn, setUser } =
    indexPage.actions;
export default indexPage.reducer;
