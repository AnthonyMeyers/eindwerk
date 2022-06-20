import { createSlice } from "@reduxjs/toolkit";

const initialState = {categories: [], priorities: [], userData: []};

const generalSlice = createSlice({
  name: "generalState",
  initialState,
  reducers: {
      //Load categories in state
    loadCategories(state, {payload: {categories}}) {
      state.categories = categories;
    },
      //Clean up categories
    cleanCategories(state) {
      state.categories = null;
    },
    //Load userData in state
    loadUserdata(state, {payload: {userData}}) {
      state.userData = userData;
    },
    //Load new picture in state
    changeProfilePicture(state, {payload: {picture}}) {
      console.log(picture);
      state.userData = { ...state.userData, usrPicture : picture};
    },
    //Clean up userData
    cleanUserdata(state) {
      state.userData = null;
    },
    //Load priorities in state
    loadPriorities(state, {payload: {priorities}}) {
      state.priorities = priorities;
    },
    //Clean up priorities
    cleanPriorities(state) {
      state.priorities = null;
    },
  },
});

export default generalSlice;
export const { loadCategories, loadPriorities, cleanCategories, cleanPriorities, loadUserdata, cleanUserdata, changeProfilePicture } = generalSlice.actions;
