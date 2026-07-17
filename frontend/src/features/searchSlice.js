import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/connection";
import { logoutUser } from "./authSlice";

export const searchBrews = createAsyncThunk(
  "search/searchBrews",
  async ({ type, query }, { rejectWithValue }) => {
    try {
      const response = await api.get("/brew/search", {
        params: {
          type,
          q: query.trim(),
        },
      });

      return response.data.data ?? [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ?? "Unable to search brews."
      );
    }
  }
);

const resetSearch = (state) => {
  state.results = [];
  state.query = "";
  state.searchStatus = "idle";
  state.error = "";
};

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchType: "name",
    query: "",
    results: [],
    searchStatus: "idle",
    error: "",
  },
  reducers: {
    setSearchType: (state, action) => {
      state.searchType = action.payload;
      state.error = "";
    },
    setSearchQuery: (state, action) => {
      state.query = action.payload;
      state.error = "";
    },
    clearSearch: (state) => {
      state.query = "";
      state.results = [];
      state.searchStatus = "idle";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBrews.pending, (state) => {
        state.searchStatus = "loading";
        state.error = "";
      })
      .addCase(searchBrews.fulfilled, (state, action) => {
        state.searchStatus = "succeeded";
        state.results = action.payload;
      })
      .addCase(searchBrews.rejected, (state, action) => {
        state.searchStatus = "failed";
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, resetSearch);
  },
});

export const { setSearchType, setSearchQuery, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
