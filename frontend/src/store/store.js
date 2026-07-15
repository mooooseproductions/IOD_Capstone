import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "../features/registrationSlice";
import authReducer from "../features/authSlice";
import brewReducer from "../features/brewSlice";
import profileReducer from "../features/profileSlice";

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    auth: authReducer,
    brew: brewReducer,
    profile: profileReducer,
  },
});