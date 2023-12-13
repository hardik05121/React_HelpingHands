import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  secondCategory: [],
};

export const secondCategorySlice = createSlice({
  name: "SecondCategory",
  initialState: initialState,
  reducers: {
    setSecondCategory: (state, action) => {
      state.secondCategory = action.payload;
    },
  },
});

export const { setSecondCategory } = secondCategorySlice.actions;
export const secondCategoryReducer = secondCategorySlice.reducer;
