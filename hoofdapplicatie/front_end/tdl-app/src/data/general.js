import { createSlice } from "@reduxjs/toolkit";

const initialState = {categories: [], priorities: []};

const generalSlice = createSlice({
  name: "generalState",
  initialState,
  reducers: {
    loadCategories(state, {payload: {categories}}) {
      //Clean up previous state to update again
      state.categories.length = 0;
      state.categories = categories;
    },
    loadPriorities(state, {payload: {priorities}}) {
      //Clean up previous state to update again
      state.priorities.length = 0;
      state.priorities = priorities;
    },
  },
});

export default generalSlice;
export const { loadCategories, loadPriorities } = generalSlice.actions;
