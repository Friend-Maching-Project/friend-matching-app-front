import { configureStore } from '@reduxjs/toolkit';
import articlesSlice from './modules/articles';
import authSlice from './modules/auth';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    articles: articlesSlice.reducer,
  },
});

export default store;
