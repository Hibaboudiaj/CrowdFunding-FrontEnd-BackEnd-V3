import { createSlice } from "@reduxjs/toolkit";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: user ? JSON.parse(user) : null,
        token: token || null,
        loading: false,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        logout: (state) => {
            state.user = null;
            state.token = null;

            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
    },
});

export const { login, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
