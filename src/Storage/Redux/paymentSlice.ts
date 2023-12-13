import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payment: [],
};

export const paymentSlice = createSlice({
  name: "Payment",
  initialState: initialState,
  reducers: {
    setPayment: (state, action) => {
      state.payment = action.payload;
    },
  },
});

export const { setPayment } = paymentSlice.actions;
export const paymentReducer = paymentSlice.reducer;
