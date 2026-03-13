import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./rootReducer";
import api from "./api";
import logger from "redux-logger";

export const store = () => {
    return configureStore({
        reducer: {
            root: rootReducer,
            [api.reducerPath]: api.reducer,
        },
        devTools: process.env.NODE_ENV !== "production",
        middleware: (geDefaultMiddleware) => geDefaultMiddleware().concat(api.middleware, logger),
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
