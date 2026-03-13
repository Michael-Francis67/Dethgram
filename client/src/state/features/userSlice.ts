import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isDarkMode: false,
};

export const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setDarkMode: (state, action) => {
            state.isDarkMode = action.payload;
        },
    },
});

export const {setDarkMode, setUser} = authSlice.actions;
export default authSlice.reducer;
