import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/userSlice'
import { apiSlice } from './features/apiSlice'
import cartSlice from './features/cartSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    users: userSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: true,
})

export default store
