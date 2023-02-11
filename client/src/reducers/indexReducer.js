import { createSlice } from "@reduxjs/toolkit";

const indexReducer = createSlice({
    name: "index",
    initialState: {
        changePage: true,
        username: "",
        password: "",
        show: false,
        errorMessage: null,
        loggedIn: null,
        user: {},
    },
    reducers: {
        changeView: state => {
            state.changePage = !state.changePage;
        },
        changeUsername: (state, action) => {
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

export const { changeView, changeUsername, changePassword, setShow, setErrorMessage, setLoggedIn, setUser } =
    indexReducer.actions;
export default indexReducer.reducer;
