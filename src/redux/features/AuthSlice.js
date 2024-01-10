// AuthSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../api';
import { clearCart } from './CartSlice';

const initialState = {
  userData: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

// login
export const login = createAsyncThunk('login', async (params, thunkApi) => {
  try {
    const response = await API.post('auth/login', params);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

// logout
export const logout = createAsyncThunk('logout', async (_, thunkApi) => {
  try {
    thunkApi.dispatch(clearCart());
    return null;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // login cases
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.userData = action.payload;
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // logout cases
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.userData = null;
    });
    builder.addCase(logout.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default AuthSlice.reducer;
