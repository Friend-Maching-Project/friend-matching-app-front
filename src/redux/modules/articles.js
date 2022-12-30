import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import qs from 'qs';

export const getArticlesWithoutFilter = createAsyncThunk(
  '/GET/ARTICLE',
  async ({ lastArticleId, size, sort }, thunkApi) => {
    thunkApi.dispatch(startArticlesLoading());
    const res = await axios.get('/article', { params: { lastArticleId, size, sort } });
    if (res.status === 200) {
      thunkApi.dispatch(finishArticlesLoading());
      return res.data;
    }
  },
);

export const getArticlesWithFilter = createAsyncThunk(
  '/GET/ARTICLE/FILTER',
  async ({ lastArticleId, size, sort, place, sex }, thunkApi) => {
    thunkApi.dispatch(startArticlesLoading());
    const res = await axios.get('/article/filter', {
      params: { lastArticleId, size, sort, place: place.join(','), sex: sex.join(',') },
    });
    if (res.status === 200) {
      thunkApi.dispatch(finishArticlesLoading());
      return res.data;
    }
  },
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    isLoading: false,
    hasMoreArticles: true,
  },
  reducers: {
    startArticlesLoading: (state) => {
      state.isLoading = true;
    },
    finishArticlesLoading: (state) => {
      state.isLoading = false;
    },
    clearArticles: (state) => {
      state.articles = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getArticlesWithoutFilter.fulfilled, (state, action) => {
      state.articles = [...state.articles, ...action.payload];
      state.hasMoreArticles = action.payload.length === 10;
    });
    builder.addCase(getArticlesWithFilter.fulfilled, (state, action) => {
      state.articles = [...state.articles, ...action.payload];
      state.hasMoreArticles = action.payload.length === 10;
    });
  },
});

export const { startArticlesLoading, finishArticlesLoading, clearArticles } = articlesSlice.actions;
export default articlesSlice;
