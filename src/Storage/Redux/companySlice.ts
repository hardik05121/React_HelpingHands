import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  company: [],
  search: "",
};

export const companySlice = createSlice({
  name: "Company",
  initialState: initialState,
  reducers: {
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setCompany, setSearchItem } = companySlice.actions;
export const companyReducer = companySlice.reducer;
