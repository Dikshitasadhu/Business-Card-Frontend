import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';
import { AUTH_ENDPOINTS } from '../../services/endpoints';

export const register = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(AUTH_ENDPOINTS.REGISTER, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(AUTH_ENDPOINTS.LOGIN, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await api.post(AUTH_ENDPOINTS.LOGOUT);
});

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isAuthLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isAuthLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthLoading = false;
        state.user = action.payload.data?.email;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.error = action.payload?.error;
      })
      .addCase(login.pending, (state) => {
        state.isAuthLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthLoading = false;
        state.user = action.meta.arg.email;
        state.isAuthenticated = true;
        state.token = action.payload.data.accessToken;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload?.error;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });
  }
});

export default authSlice.reducer;
