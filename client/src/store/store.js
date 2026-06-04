import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./slices/projectsSlice";
import authReducer from "./slices/authSlice";
import investmentsReducer from "./slices/investmentsSlice";

const store = configureStore({
    reducer: {
        projects: projectsReducer,
        auth: authReducer,
        investments: investmentsReducer,
    },
});

export default store;
