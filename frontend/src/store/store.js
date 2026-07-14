import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "../features/registrationSlice";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    auth: authReducer,
  },
});