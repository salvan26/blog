import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { deleteArticle } from '../../services/deleteArticle';

export const deleteArticleThunk = createAsyncThunk(
  'article/deleteArticleFetch',
  async (slug, { getState, rejectWithValue }) => {
    const state = getState();
    const { token } = state.account;
    return deleteArticle(slug, token, rejectWithValue);
  }
);

const deleteArticleSlice = createSlice({
  name: 'article',
  initialState: {
    articles: [],
    article: null,
    isLoading: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteArticleThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteArticleThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = state.articles.filter((article) => article.slug !== action.payload);
        state.article = null;
      })
      .addCase(deleteArticleThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const deleteArticleReducer = deleteArticleSlice.reducer;
