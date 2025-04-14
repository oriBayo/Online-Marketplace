import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import { apiSlice } from './features/apiSlice';
import cartSlice from './features/cartSlice';
import notificationSlice from './features/notificationSlice';
import { notificationMiddleware } from './middleware/notificationMiddleware';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    users: userSlice,
    cart: cartSlice,
    notifications: notificationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(apiSlice.middleware)
      .concat(notificationMiddleware),
  devTools: true,
});

export default store;
