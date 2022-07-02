import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import locationReducer from "./slices/locationSlice";
import roomReducer from "./slices/roomSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "redux-persist/lib/storage";
import timeScheduleReducer from "./slices/timeScheduleSlice";
import userReducer from "./slices/userSlice";

const reducer = {
  user: userReducer,
  location: locationReducer,
  room: roomReducer,
  timeSchedule: timeScheduleReducer,
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "location"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    ...reducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

setupListeners(store.dispatch);
