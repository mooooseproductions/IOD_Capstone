import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/connection";

export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/profile");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ?? "Unable to load your profile."
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    brews: [],
    status: "idle",
    error: "",
  },
  reducers: {
    clearProfile: (state) => {
      state.user = null;
      state.brews = [];
      state.status = "idle";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        const { brew = [], ...userDetails } = action.payload;

        state.status = "succeeded";
        state.user = userDetails;
        state.brews = brew;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Unable to load your profile.";
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
