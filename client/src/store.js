import { configureStore } from "@reduxjs/toolkit";
import indexPageReducer from "./reducers/indexReducer";
import userReducer from "./reducers/userReducer";
export default configureStore({
    reducer: {
        index: indexPageReducer,
        user: userReducer,
    },
});
