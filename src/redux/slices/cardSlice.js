import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { CARD_ENDPOINTS } from "../../services/endpoints";

// Async thunk to fetch a card by ID
export const fetchCardById = createAsyncThunk(
  "card/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(CARD_ENDPOINTS.GET_BY_ID(id));
      return response.data.data.card; // Fix: access card through data.data.card
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Fetch all cards of authenticated user
export const fetchUserCards = createAsyncThunk(
  "card/fetchUserCards",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(CARD_ENDPOINTS.GET_USER_CARDS);
      return response.data.data.cards; // FIX: Correct response path
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);


// Async thunk to create a card (multipart upload)
export const createCard = createAsyncThunk(
  "card/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(CARD_ENDPOINTS.CREATE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.data.card; // Fix: access card through data.data.card
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Async thunk to update a card
export const updateCard = createAsyncThunk(
  "card/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        CARD_ENDPOINTS.UPDATE_BY_ID(id),
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data.card;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Async thunk to delete a card
export const deleteCard = createAsyncThunk(
  "card/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(CARD_ENDPOINTS.DELETE_BY_ID(id));
      return response.data.deletedCard;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

const cardSlice = createSlice({
  name: "card",
  initialState: {
    card: null, // currently viewed card
    cards: [], // list of user's cards
    loading: false,
    error: null,
  },
  reducers: {
    clearCard(state) {
      state.card = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCardById.fulfilled, (state, action) => {
        state.loading = false;
        state.card = action.payload;
      })
      .addCase(fetchCardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCards.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload; // array of cards
      })
      .addCase(fetchUserCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCard.fulfilled, (state, action) => {
        state.loading = false;
        state.card = action.payload;
      })
      .addCase(createCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        state.loading = false;
        state.card = action.payload;
      })
      .addCase(updateCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCard.fulfilled, (state) => {
        state.loading = false;
        state.card = null;
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCard } = cardSlice.actions;
export default cardSlice.reducer;
