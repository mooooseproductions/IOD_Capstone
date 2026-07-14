// src/redux/authSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api, { setApiAccessToken } from "../api/connection";

const initialState = {
  user: null,
  accessToken: null,
  status: "idle",
  error: "",
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",

  async (loginDetails, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", loginDetails);

      const { user, accessToken } = response.data.data;

      setApiAccessToken(accessToken);

      return {
        user,
        accessToken,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Unable to log in. Please try again."
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",

  async (_, { rejectWithValue }) => {
    try {
      await api.post("/auth/logout");

      setApiAccessToken(null);

      return true;
    } catch (error) {
      setApiAccessToken(null);

      return rejectWithValue(
        error.response?.data?.message ||
        "Unable to complete server logout"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    clearLoginError: (state) => {
      state.error = "";
    },

    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.status = "idle";
      state.error = "";

      localStorage.removeItem("accessToken");
    },
  },

  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.error = "";
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.accessToken = null;
        state.error = action.payload || "Login failed";
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
        state.accessToken = null;
        state.error = "";
      })

      .addCase(logoutUser.rejected, (state, action) => {
        /*
          Clear frontend authentication even if the backend logout
          request fails.
        */
        state.status = "idle";
        state.user = null;
        state.accessToken = null;
        state.error = action.payload || "Server logout failed";
      });
  },
});

export const {
  clearLoginError,
  clearAuth,
} = authSlice.actions;

export default authSlice.reducer;