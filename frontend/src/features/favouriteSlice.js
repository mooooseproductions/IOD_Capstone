import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import api from "../api/connection";
import {
  loginUser,
  logoutUser,
} from "./authSlice";

const initialState = {
  items: [],
  status: "idle",
  error: "",
};

export const fetchFavourites = createAsyncThunk(
  "favourites/fetchFavourites",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/favourites");

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Unable to load favourites"
      );
    }
  }
);

export const addFavourite = createAsyncThunk(
  "favourites/addFavourite",
  async (brewId, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/favourites/${brewId}`
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Unable to add favourite"
      );
    }
  }
);

export const removeFavourite = createAsyncThunk(
  "favourites/removeFavourite",
  async (brewId, { rejectWithValue }) => {
    try {
      await api.delete(`/favourites/${brewId}`);

      return brewId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Unable to remove favourite"
      );
    }
  }
);

const favouriteSlice = createSlice({
  name: "favourites",
  initialState,

  reducers: {
    clearFavourites: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = "";
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchFavourites.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchFavourites.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload || "Unable to load favourites";
      })

      // Add
      .addCase(addFavourite.fulfilled, (state, action) => {
        const favourite = action.payload;

        const alreadyExists = state.items.some(
          (item) => item.brewId === favourite.brewId
        );

        if (!alreadyExists) {
          state.items.push(favourite);
        }
      })

      // Remove
      .addCase(removeFavourite.fulfilled, (state, action) => {
        const brewId = action.payload;

        state.items = state.items.filter(
          (item) => item.brewId !== brewId
        );
      })

      // Prevent state leaking between users
      .addCase(loginUser.pending, (state) => {
        state.items = [];
        state.status = "idle";
        state.error = "";
      })
      .addCase(logoutUser.pending, (state) => {
        state.items = [];
        state.status = "idle";
        state.error = "";
      });
  },
});

export const { clearFavourites } =
  favouriteSlice.actions;

export default favouriteSlice.reducer;