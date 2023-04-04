import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./types";


const initialState: AuthState = {
mode: "dark",
user: null,
token: null,
};

export const authSlice = createSlice({
name: "auth",
initialState,
reducers: {
setMode: (state) => {
state.mode = state.mode === "dark" ? "light" : "dark";
},
setLogin: (state, action: PayloadAction<{ user: string; token: string }>) => {
state.user = action.payload.user;
state.token = action.payload.token;
},
setLogout: (state) => {
state.user = null;
state.token = null;
},
},
});

export const { setMode, setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;