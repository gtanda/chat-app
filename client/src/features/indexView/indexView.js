import {createSlice} from "@reduxjs/toolkit";

export const indexView = createSlice({
    name: "index",
    initialState: {value: true},
    reducers: {
        changeView: (state) => {
            state.value = !state.value;
        }
    }
});

export const {changeView} = indexView.actions;
export default indexView.reducer;
