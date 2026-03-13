import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "./features/userSlice";

export const rootReducer = combineReducers({
    auth: authReducer,
});
