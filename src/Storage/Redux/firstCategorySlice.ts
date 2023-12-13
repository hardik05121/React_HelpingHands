import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstCategory: [],
};

export const firstCategorySlice = createSlice({
  name: "FirstCategory",
  initialState: initialState,
  reducers: {
    setFirstCategory: (state, action) => {
      state.firstCategory = action.payload;
    },
  },
});

export const { setFirstCategory } = firstCategorySlice.actions;
export const firstCategoryReducer = firstCategorySlice.reducer;
