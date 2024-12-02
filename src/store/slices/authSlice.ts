import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { AuthService } from '../../services';

export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, { rejectWithValue }) => {
  try {
    const response = await AuthService.refreshToken();
    localStorage.setItem('access_token', response.data.access_token);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to refresh token');
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    accessToken: localStorage.getItem('access_token') || null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.accessToken = action.payload.access_token;
      state.isAuthenticated = true;
    });
    builder.addCase(refreshToken.rejected, (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
