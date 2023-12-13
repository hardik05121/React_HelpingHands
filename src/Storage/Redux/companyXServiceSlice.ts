import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companyXService: [],
};

export const companyXServiceSlice = createSlice({
  name: "CompanyXService",
  initialState: initialState,
  reducers: {
    setCompanyXService: (state, action) => {
      state.companyXService = action.payload;
    },
  },
});

export const { setCompanyXService } = companyXServiceSlice.actions;
export const companyXServiceReducer = companyXServiceSlice.reducer;
