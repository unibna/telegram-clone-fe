import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { UserService } from '../services';

export const fetchMe = createAsyncThunk('user/fetchMe', async (_, { rejectWithValue }) => {
  try {
    const response = await UserService.me();
    console.log("--> Me:", response.data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch user info');
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    status: 'idle', // idle, loading, succeeded, failed
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default userSlice.reducer;
