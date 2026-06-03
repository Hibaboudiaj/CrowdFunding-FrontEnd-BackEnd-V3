import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./slices/projectsSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
    reducer: {
        projects: projectsReducer,
        auth: authReducer,
    },
});

export default store;
