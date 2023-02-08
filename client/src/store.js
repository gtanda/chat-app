import {configureStore} from "@reduxjs/toolkit";
import indexPageReducer from "./reducers/indexPage";
export default configureStore({
    reducer: {
        index: indexPageReducer
    },
});
