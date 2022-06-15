import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoApi from "./todoApi";
import admin from "./admin";
import general from "./general";
import storage from "redux-persist/lib/storage";
import {persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from "redux-persist";

const persistConfig = {
  key: "general",
  storage
}

const store = configureStore({
  reducer: combineReducers({
    [todoApi.reducerPath]: todoApi.reducer,
    [admin.name]: admin.reducer,
    [general.name]: general.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck:{
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }}).concat(todoApi.middleware),
});

export default store;
