import { createSlice, current } from "@reduxjs/toolkit";
import {
  addUserToDatabaseAsync,
  checkVerificationCode,
  resendVerificationCode,
  verifyPhoneNumber,
} from "./auth-actions";

const initialState = {
  loading: false,
  error: null,
  user: { id:null, isNewUser: null, firebaseUserId: null },
  authToken: null,
  phoneNumber: "",
  verificationCode: "",
  confirmationResult: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setVerificationCode: (state, action) => {
      state.verificationCode = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setToken: (state, action) => {
      state.authToken = action.payload;
      state.isAuthenticated = true;
    },
    setIsNewUser: (state, action) => {
      state.user.isNewUser = action.payload;
    },
    signOut: (state) => {
      state.user = null;
      state.authToken = null;
      state.isAuthenticated = false;
      state.confirmationResult = null; // Can be removed, check it later!
    },
  },
  extraReducers: (builder) => {
    //Authenticate user
    builder
      .addCase(verifyPhoneNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPhoneNumber.fulfilled, (state, action: any) => {
        state.loading = false;
        state.confirmationResult = action.payload;
      })
      .addCase(verifyPhoneNumber.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkVerificationCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkVerificationCode.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;

      })
      .addCase(checkVerificationCode.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      }) 

      //Resend verification code
      .addCase(resendVerificationCode.fulfilled, (state, action) => {
        // Handle the result of the resendVerificationCode async thunk
      })
      .addCase(resendVerificationCode.rejected, (state, action) => {
        // Handle the error if needed
      })

      //Add authenticated user to db
      .addCase(addUserToDatabaseAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUserToDatabaseAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user.id = action.payload.user_id;

      })
      .addCase(addUserToDatabaseAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const {
  setVerificationCode,
  setPhoneNumber,
  setUser,
  setToken,
  signOut,
  setIsNewUser
} = authSlice.actions;

export default authSlice.reducer;
