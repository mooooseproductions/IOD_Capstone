import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/connection";

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

export const fetchFavourites = createAsyncThunk(
  "search/fetchFavourites",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/favourites");
      return response.data.data ?? [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ?? "Unable to load favourites."
      );
    }
  }
);

export const addFavourite = createAsyncThunk(
  "search/addFavourite",
  async (brewId, { dispatch, rejectWithValue }) => {
    try {
      await api.post(`/favourites/${brewId}`);
      await dispatch(fetchFavourites()).unwrap();
      return brewId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ?? "Unable to save favourite."
      );
    }
  }
);

export const removeFavourite = createAsyncThunk(
  "search/removeFavourite",
  async (brewId, { dispatch, rejectWithValue }) => {
    try {
      await api.delete(`/favourites/${brewId}`);
      await dispatch(fetchFavourites()).unwrap();
      return brewId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ?? "Unable to remove favourite."
      );
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchType: "name",
    query: "",
    results: [],
    favourites: [],
    searchStatus: "idle",
    favouritesStatus: "idle",
    changingFavouriteId: null,
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
      .addCase(fetchFavourites.pending, (state) => {
        state.favouritesStatus = "loading";
      })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.favouritesStatus = "succeeded";
        state.favourites = action.payload;
      })
      .addCase(fetchFavourites.rejected, (state, action) => {
        state.favouritesStatus = "failed";
        state.error = action.payload;
      })
      .addCase(addFavourite.pending, (state, action) => {
        state.changingFavouriteId = action.meta.arg;
        state.error = "";
      })
      .addCase(addFavourite.fulfilled, (state) => {
        state.changingFavouriteId = null;
      })
      .addCase(addFavourite.rejected, (state, action) => {
        state.changingFavouriteId = null;
        state.error = action.payload;
      })
      .addCase(removeFavourite.pending, (state, action) => {
        state.changingFavouriteId = action.meta.arg;
        state.error = "";
      })
      .addCase(removeFavourite.fulfilled, (state) => {
        state.changingFavouriteId = null;
      })
      .addCase(removeFavourite.rejected, (state, action) => {
        state.changingFavouriteId = null;
        state.error = action.payload;
      });
  },
});

export const { setSearchType, setSearchQuery, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
