import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authReducer } from "./auth/slice";
import { storesNearReducer } from "./storesNear/slice";
import { reviewsReducer } from "./reviews/slice";
import { storesReducer } from "./stores/slice";
import { productsReducer } from "./products/slice";
import { cartReducer } from "./cart/slice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["token"],
};

const persistedAuth = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuth,
    stores: storesReducer,
    storesNear: storesNearReducer,
    reviews: reviewsReducer,
    products: productsReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
