import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { oneproductsApi, productsApi } from "./productsApi";
import cartReducer from "./CartSlice";
export const store = configureStore({
  reducer: {
    // carttt => mwjud m3 hook useSelector
    carttt: cartReducer,
    // Add the generated reducer as a specific top-level slice
    [productsApi.reducerPath]: productsApi.reducer,
    [oneproductsApi.reducerPath]: oneproductsApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(oneproductsApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
