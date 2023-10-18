// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUser } from '../api/profile';

export const fetchUserData = createAsyncThunk('user/fetchUserData', async (toast, { rejectWithValue }) => {
  try {
    const response = await getUser(toast);
    console.log("respon di redux", response.data)
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
