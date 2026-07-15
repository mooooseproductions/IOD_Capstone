import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/connection";

const emptyIngredient = (timing = "base") => ({
  type: "",
  name: "",
  amount: "",
  unit: "g",
  timing,
});

const emptyForm = {
  name: "",
  style: "",
  batchSize: "",
  batchUnit: "L",
  status: "planning",
  originalGravity: "",
  finalGravity: "",
  abv: "",
  temperature: "",
  temperatureUnit: "C",
  notes: "",
};

const unwrapList = (response) => {
  const payload = response.data?.data ?? response.data;
  return Array.isArray(payload) ? payload : [];
};

export const fetchBrewReferenceData = createAsyncThunk(
  "brew/fetchReferenceData",
  async (_, { rejectWithValue }) => {
    try {
      const [stylesResponse, ingredientsResponse] = await Promise.all([
        api.get("/lookup/styles"),
        api.get("/lookup/ingredients"),
      ]);

      return {
        styles: unwrapList(stylesResponse),
        ingredients: unwrapList(ingredientsResponse),
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ?? "Unable to load brew options."
      );
    }
  }
);

export const submitBrew = createAsyncThunk(
  "brew/submitBrew",
  async (
    { brewId, formData, ingredients, styles },
    { rejectWithValue }
  ) => {
    try {
      const normalisedStyle = formData.style.trim().toLowerCase();

      let selectedStyle = styles.find(
        (style) =>
          style.normalisedName === normalisedStyle ||
          style.name.trim().toLowerCase() === normalisedStyle
      );

      if (!selectedStyle) {
        const styleResponse = await api.post("/lookup/styles", {
          name: formData.style.trim(),
        });

        selectedStyle = styleResponse.data.data;
      }

      const {
        style: _styleName,
        notes,
        ...brewFields
      } = formData;

      const payload = {
        ...brewFields,
        styleId: selectedStyle.id,
        batchSize: Number(formData.batchSize),
        ingredients: ingredients.map((item) => ({
          type: item.type,
          name: item.name,
          amount: Number(item.amount),
          unit: item.unit,
          timing: item.timing,
        })),
        notes: notes.trim()
          ? [{ content: notes.trim() }]
          : [],
      };

      const response = brewId
        ? await api.put(`/brew/${brewId}`, payload)
        : await api.post("/brew", payload);

      return {
        data: response.data,
        editing: Boolean(brewId),
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ??
        "Unable to save the brew."
      );
    }
  }
);

export const fetchBrewById = createAsyncThunk(
  "brew/fetchBrewById",
  async (brewId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/brew/${brewId}`);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ??
        "Unable to load the brew."
      );
    }
  }
);

const initialState = {
  formData: { ...emptyForm },
  ingredientDrafts: {
    base: emptyIngredient("base"),
    postWort: emptyIngredient("post-wort"),
  },
  ingredients: [],
  styles: [],
  availableIngredients: [],
  referenceStatus: "idle",
  submitStatus: "idle",
  message: "",
  errors: {},
};

const brewSlice = createSlice({
  name: "brew",
  initialState,
  reducers: {
    setBrewField: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
      state.errors[field] = "";
      state.message = "";
    },
    setIngredientDraftField: (state, action) => {
      const { section, field, value } = action.payload;
      state.ingredientDrafts[section][field] = value;

      if (field === "type") {
        state.ingredientDrafts[section].name = "";
      }

      state.errors[`${section}Ingredient`] = "";
    },
    addIngredient: (state, action) => {
      const { section, clientId } = action.payload;
      const draft = state.ingredientDrafts[section];

      if (!draft.type || !draft.name.trim() || !draft.amount || !draft.unit) {
        state.errors[`${section}Ingredient`] =
          "Complete the type, name, amount and unit before adding.";
        return;
      }

      state.ingredients.push({
        ...draft,
        name: draft.name.trim(),
        clientId,
      });
      state.ingredientDrafts[section] = emptyIngredient(draft.timing);
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.clientId !== action.payload
      );
    },
    setBrewErrors: (state, action) => {
      state.errors = { ...state.errors, ...action.payload };
    },
    clearBrewMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrewReferenceData.pending, (state) => {
        state.referenceStatus = "loading";
      })
      .addCase(fetchBrewReferenceData.fulfilled, (state, action) => {
        state.referenceStatus = "succeeded";
        state.styles = action.payload.styles;
        state.availableIngredients = action.payload.ingredients;
      })
      .addCase(fetchBrewReferenceData.rejected, (state, action) => {
        state.referenceStatus = "failed";
        state.message = action.payload;
      })
      .addCase(submitBrew.pending, (state) => {
        state.submitStatus = "loading";
        state.message = "";
      })
      .addCase(submitBrew.fulfilled, (state, action) => {
        state.submitStatus = "succeeded";
        state.message = action.payload.editing
          ? "Brew updated successfully."
          : "Brew saved successfully";
        state.formData = { ...emptyForm };
        state.ingredients = [];
        state.ingredientDrafts = {
          base: emptyIngredient("base"),
          postWort: emptyIngredient("post-wort"),
        };
        state.errors = {};
      })
      .addCase(submitBrew.rejected, (state, action) => {
        state.submitStatus = "failed";
        state.message = action.payload;
      })
      .addCase(fetchBrewById.fulfilled, (state, action) => {
        const brew = action.payload;

        state.formData = {
          name: brew.name,
          style: brew.style?.name ?? "",
          batchSize: String(brew.batchSize),
          batchUnit: brew.batchUnit,
          status: brew.status,
          originalGravity: brew.originalGravity
            ? String(brew.originalGravity)
            : "",
          finalGravity: brew.finalGravity
            ? String(brew.finalGravity)
            : "",
          temperature: brew.temperature != null
            ? String(brew.temperature)
            : "",
          temperatureUnit: brew.temperatureUnit ?? "C",
          notes: brew.note?.[0]?.content ?? "",
        };

        state.ingredients = brew.ingredient.map((record) => ({
          clientId: `existing-${record.id}`,
          type: record.ingredient.type,
          name: record.ingredient.name,
          amount: String(record.amount),
          unit: record.unit,
          timing: record.timing,
        }));

        state.submitStatus = "idle";
        state.message = "";
      })
      .addCase(fetchBrewById.pending, (state) => {
        state.loadStatus = "loading";
        state.message = "";
      })
      .addCase(fetchBrewById.rejected, (state, action) => {
        state.loadStatus = "failed";
        state.message =
          action.payload ?? "Unable to load the brew.";
      });
},
});

export const {
  setBrewField,
  setIngredientDraftField,
  addIngredient,
  removeIngredient,
  setBrewErrors,
  clearBrewMessage,
} = brewSlice.actions;

export default brewSlice.reducer;
