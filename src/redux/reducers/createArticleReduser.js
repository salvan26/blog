import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { createArticle, editArticle } from '../../services/createArticle';

export const createArticleThunk = createAsyncThunk(
  'myArticle/createArticleFetch',
  async (article, { rejectWithValue }) => {
    return createArticle(article, rejectWithValue);
  }
);

export const editArticleThunk = createAsyncThunk('myArticle/editArticleFetch', async (article, { rejectWithValue }) => {
  return editArticle(article, rejectWithValue);
});

const createArticleSlice = createSlice({
  name: 'myArticle',
  initialState: {
    article: null,
    isCreatingLoading: null,
    isCreatingError: null,
    isEditingLoading: null,
    isEditingError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createArticleThunk.pending, (state, action) => {
        state.isCreatingLoading = true;
        state.isCreatingError = false;
        state.article = null;
      })
      .addCase(createArticleThunk.fulfilled, (state, action) => {
        state.isCreatingLoading = false;
        state.isCreatingError = false;
        state.article = action.payload;
      })
      .addCase(createArticleThunk.rejected, (state, action) => {
        state.isCreatingLoading = false;
        state.isCreatingError = true;
      })
      .addCase(editArticleThunk.pending, (state, action) => {
        state.isEditingLoading = true;
        state.article = null;
      })
      .addCase(editArticleThunk.fulfilled, (state, action) => {
        state.isEditingLoading = false;
        state.isEditingError = false;
        state.article = action.payload;
      })
      .addCase(editArticleThunk.rejected, (state, action) => {
        state.isEditingError = true;
      });
  },
});

export const createArticleReducer = createArticleSlice.reducer;