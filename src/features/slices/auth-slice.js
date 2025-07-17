import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  loading: false,
  error: null,
  otpSent: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.email = action.payload.email;
      state.otpSent = true;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    verifyOtpStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    verifyOtpSuccess: (state) => {
      state.loading = false;
      state.email = null;
      state.otpSent = false;
      state.error = null;
    },
    verifyOtpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  verifyOtpStart,
  verifyOtpSuccess,
  verifyOtpFailure,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
