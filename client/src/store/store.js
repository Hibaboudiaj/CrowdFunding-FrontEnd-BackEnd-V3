import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./slices/projectsSlice";
import authReducer from "./slices/authSlice";
import investmentsReducer from "./slices/investmentsSlice";

import walletReducer from "./slices/walletSlice";//add it

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    auth: authReducer,
    wallet: walletReducer, // add it
  },
});

export default store;
