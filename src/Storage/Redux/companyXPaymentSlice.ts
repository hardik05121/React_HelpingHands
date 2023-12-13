import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companyXPayment: [],
};

export const companyXPaymentSlice = createSlice({
  name: "CompanyXPayment",
  initialState: initialState,
  reducers: {
    setCompanyXPayment: (state, action) => {
      state.companyXPayment = action.payload;
    },
  },
});

export const { setCompanyXPayment } = companyXPaymentSlice.actions;
export const companyXPaymentReducer = companyXPaymentSlice.reducer;
