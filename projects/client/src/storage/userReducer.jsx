import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUser, updateAvatar } from '../api/profile';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const USER_URL = `${BASE_URL}/user`;

let initialState = {
  userData: {
    name: '',
    username: '',
    email: '',
    phone: '',
    is_verified: false,
    current_password: '',
    new_password: '',
    confirm_password: '',
    avatar: '',
  },
  isLoading: false,
  error: null,
}

export const fetchUserData = createAsyncThunk('user/fetchUserData', async (toast, { rejectWithValue }) => {
  try {
    const response = await getUser(toast);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateUserAvatar = createAsyncThunk('user/updateUserAvatar', async ({ token, file, userData }) => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);
    Object.keys(userData).forEach((key) => {
      formData.append(key, userData[key]);
    });
    const response = await axios.patch(`${USER_URL}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
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
      })
      .addCase(updateUserAvatar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData.avatar = action.payload.avatar;
      })
      .addCase(updateUserAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

export default userSlice.reducer;
