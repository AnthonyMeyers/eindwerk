import { createSlice } from "@reduxjs/toolkit";

const initialState = { admin: false };

const adminSlice = createSlice({
  name: "adminState",
  initialState,
  reducers: {
    changeState(state) {
      state.admin = !state.admin;
    },
  },
});

export default adminSlice;
export const { changeState } = adminSlice.actions;
