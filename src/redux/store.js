import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cardReducer from './slices/cardSlice';
import authReducer from './slices/authSlice'; // Import auth reducer

// Persist config — now persisting both card and auth slices
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['card', 'auth'], // Persist business card and auth state
  debug: false,
};

// Combine reducers — include auth
const rootReducer = combineReducers({
  card: cardReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
