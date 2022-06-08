import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoApi from "./todoApi";
import admin from "./admin";
import general from "./general";

const store = configureStore({
  reducer: combineReducers({
    [todoApi.reducerPath]: todoApi.reducer,
    [admin.name]: admin.reducer,
    [general.name]: general.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

export default store;
