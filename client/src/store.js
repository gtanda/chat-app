import {configureStore} from "@reduxjs/toolkit";
import indexView from "./features/indexView/indexView";
export default configureStore({
    reducer: {
        index: indexView
    }
});
