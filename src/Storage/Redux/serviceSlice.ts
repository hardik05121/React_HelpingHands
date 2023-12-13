import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  service: [],
};

export const serviceSlice = createSlice({
  name: "Service",
  initialState: initialState,
  reducers: {
    setService: (state, action) => {
      state.service = action.payload;
    },
  },
});

export const { setService } = serviceSlice.actions;
export const serviceReducer = serviceSlice.reducer;
