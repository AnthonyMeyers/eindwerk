import { createSlice } from "@reduxjs/toolkit";

const initialState = {categories: [], priorities: []};

const generalSlice = createSlice({
  name: "generalState",
  initialState,
  reducers: {
    loadCategories(state, {payload: {categories}}) {
      state.categories = categories;

    },
    loadPriorities(state, {payload: {priorities}}) {
      state.priorities = priorities;
    },
  },
});

export default generalSlice;
export const { loadCategories, loadPriorities } = generalSlice.actions;
