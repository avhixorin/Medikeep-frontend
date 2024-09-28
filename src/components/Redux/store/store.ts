import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice"; // Check path to authSlice
import activitySlice from "../features/activitySlice"; // Check path to activitySlice

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Redux Persist configuration
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authSlice,
  activity: activitySlice,
});

// Wrap rootReducer with persistConfig
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Get RootState type from the store
export type RootState = ReturnType<typeof rootReducer>;

// Export the store as default
export default store;
