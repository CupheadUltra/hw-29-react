import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlice';
import { filterReducer } from './filterSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// 1. Об'єднуємо всі редюсери в один загальний Root Reducer
const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});

// 2. Налаштовуємо конфігурацію: зберігаємо ТІЛЬКИ контакти
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['contacts'], 
};

// 3. Обгортаємо весь редюсер
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);