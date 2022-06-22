import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoApi from "./todoApi";
import general from "./general";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import generalSlice from "./general";

const persistConfig = {
  key: "general",
  storage,
};

const reducers = combineReducers({ [generalSlice.name]: generalSlice.reducer });

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: combineReducers({
    [todoApi.reducerPath]: todoApi.reducer,
    //Redux Slices
    persistedReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(todoApi.middleware),
});

export default store;
