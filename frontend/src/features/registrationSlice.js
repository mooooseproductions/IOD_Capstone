import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/connection";

const emptyForm = {
  name: "",
  handle: "",
  email: "",
  password: "",
};

const initialState = {
  formData: emptyForm,
  errors: {},
  message: "",
  status: "idle",
};

export const registerUser = createAsyncThunk(
  "registration/registerUser",

  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/register", formData);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Unable to register. Please try again."
      );
    }
  }
);

const registrationSlice = createSlice({
  name: "registration",
  initialState,

  reducers: {
    setFormField: (state, action) => {
      const { field, value } = action.payload;

      state.formData[field] = value;

      // Clear this field's validation error
      state.errors[field] = "";

      // Clear old server messages when editing
      state.message = "";
    },

    setValidationErrors: (state, action) => {
      state.errors = action.payload;
    },

    clearValidationErrors: (state) => {
      state.errors = {};
    },

    clearRegistrationForm: (state) => {
      state.formData = { ...emptyForm };
      state.errors = {};
    },

    clearRegistrationMessage: (state) => {
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.message = "";
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message =
          action.payload.message || "Registration successful";

        state.formData = { ...emptyForm };
        state.errors = {};
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.message =
          action.payload || "Unable to register. Please try again.";
      });
  },
});

export const {
  setFormField,
  setValidationErrors,
  clearValidationErrors,
  clearRegistrationForm,
  clearRegistrationMessage,
} = registrationSlice.actions;

export default registrationSlice.reducer;