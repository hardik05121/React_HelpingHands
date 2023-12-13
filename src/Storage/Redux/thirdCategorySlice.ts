import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  thirdCategory: [],
};

export const thirdCategorySlice = createSlice({
  name: "ThirdCategory",
  initialState: initialState,
  reducers: {
    setThirdCategory: (state, action) => {
      state.thirdCategory = action.payload;
    },
  },
});

export const { setThirdCategory } = thirdCategorySlice.actions;
export const thirdCategoryReducer = thirdCategorySlice.reducer;
