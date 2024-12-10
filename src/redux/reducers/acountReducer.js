import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { createAccount, enterAccount, editProfile } from '../../services/createAcc';

export const createAccountThunk = createAsyncThunk('account/createAccountFetch', async (user, { rejectWithValue }) => {
  return createAccount(user, rejectWithValue);
});

export const enterAccountThunk = createAsyncThunk('account/enterAccountFetch', async (user, { rejectWithValue }) => {
  return enterAccount(user, rejectWithValue);
});

export const editProfileThunk = createAsyncThunk('account/editAccountFetch', async (user, { rejectWithValue }) => {
  return editProfile(user, rejectWithValue);
});

export const accountReducerSlice = createSlice({
  name: 'account',
  initialState: {
    token: null,
    user: null,
    isCreatingError: false,
    isCreatingLoader: false,
    isEnteringError: false,
    isEnteringLoader: false,
    isEditingLoader: false,
    isEditingError: false,
  },
  reducers: {
    logOut(state) {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
    setUser(state) {
      if (localStorage.getItem('user') !== null) {
        state.user = JSON.parse(localStorage.getItem('user'));
        state.token = JSON.parse(localStorage.getItem('token'));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccountThunk.pending, (state) => {
        state.isCreatingLoader = true;
      })
      .addCase(createAccountThunk.fulfilled, (state, action) => {
        state.isCreatingLoader = false;
        state.isCreatingError = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(createAccountThunk.rejected, (state) => {
        state.isCreatingError = true;
        state.isCreatingLoader = false;
      })
      .addCase(enterAccountThunk.pending, (state) => {
        state.isEnteringLoader = true;
      })
      .addCase(enterAccountThunk.fulfilled, (state, action) => {
        state.isEnteringLoader = false;
        state.isEnteringError = false;
        state.token = action.payload.user.token;
        state.user = action.payload.user;
        localStorage.setItem('token', JSON.stringify(action.payload.user.token));
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(enterAccountThunk.rejected, (state) => {
        state.isEnteringError = true;
        state.isEnteringLoader = false;
      })
      .addCase(editProfileThunk.pending, (state) => {
        state.isEditingLoader = true;
      })
      .addCase(editProfileThunk.fulfilled, (state, action) => {
        state.isEditingLoader = false;
        state.isEditingError = false;
        state.token = action.payload.user.token;
        state.user = action.payload.user;
        localStorage.clear();
        localStorage.setItem('token', JSON.stringify(action.payload.user.token));
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(editProfileThunk.rejected, (state) => {
        state.isEditingError = true;
        state.isEditingLoader = false;
      });
  },
});

export const accountReducer = accountReducerSlice.reducer;
