import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';
import { AUTH_ENDPOINTS } from '../../services/endpoints';
export const register = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(AUTH_ENDPOINTS.REGISTER, data);

      // Pass the entire response payload as success, even if success: false, so frontend can handle
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { error: 'Unknown error' });
    }
  }
);



export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await api.post(AUTH_ENDPOINTS.VERIFY_OTP, { email, otp });
      return response.data;
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

// Initial state: always unauthenticated unless API returns user/token
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
      .addCase(verifyOtp.pending, (state) => {
        state.isAuthLoading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isAuthLoading = false;
        // Parse response: action.payload.data contains user and tokens
        const { accessToken, user } = action.payload.data;
        state.user = user;
        state.token = accessToken;
        state.isAuthenticated = true;
        state.error = null;
        // No cookie handling here; backend sets cookies
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.error = action.payload?.error || "OTP verification failed.";
      })
      .addCase(login.pending, (state) => {
        state.isAuthLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthLoading = false;
        // Parse response: action.payload.data contains user and tokens
        const { accessToken, user } = action.payload.data;
        state.user = user;
        state.token = accessToken;
        state.isAuthenticated = true;
        state.error = null;
        // No cookie handling here; backend sets cookies
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
        // No cookie handling here; backend clears cookies
      });
  }
});

export default authSlice.reducer;
