import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companyXAmenity: [],
};

export const companyXAmenitySlice = createSlice({
  name: "CompanyXAmenity",
  initialState: initialState,
  reducers: {
    setCompanyXAmenity: (state, action) => {
      state.companyXAmenity = action.payload;
    },
  },
});

export const { setCompanyXAmenity } = companyXAmenitySlice.actions;
export const companyXAmenityReducer = companyXAmenitySlice.reducer;
