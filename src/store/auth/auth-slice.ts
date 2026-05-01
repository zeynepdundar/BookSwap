import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  addUserToDatabaseAsync,
  checkVerificationCode,
  verifyPhoneNumber,
} from "./auth-actions";
import { AuthError, AuthState } from "./auth.types";

const initialState: AuthState = {
  loading: false,
  error: null,
  user: { id: "", isNewUser: false, firebaseUserId: null },
  authToken: null,
  verificationCode: "",
  verificationId: null,
  isAuthenticated: false,
};

// const initialState = {
//   loading: false,
//   error: null,
//   user: { id:"28", isNewUser: false, firebaseUserId: "j8BjbVxlAOcdk53PrJUgHicrvXC2" },
//   authToken: "null",
//   phoneNumber: "+15556662222",
//   verificationCode: "",
//   verificationId: null,
//   isAuthenticated: true,
// };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthState["user"]>) {
      state.user = action.payload;
    },
    setVerificationCode(state, action: PayloadAction<string>) {
      state.verificationCode = action.payload;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.authToken = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setIsNewUser(state, action: PayloadAction<boolean>) {
      state.user.isNewUser = action.payload;
    },
    signOut: () => initialState,
  },
  extraReducers: (builder) => {
    // -------------------------
    // VERIFY PHONE NUMBER
    // -------------------------    
    builder
      .addCase(verifyPhoneNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPhoneNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.verificationId = action.payload.verificationId;
      })
      .addCase(verifyPhoneNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as AuthError;
      })
    // -------------------------
    // CHECK VERIFICATION CODE
    // -------------------------
    builder
      .addCase(checkVerificationCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkVerificationCode.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user.firebaseUserId = action.payload.user.firebaseUserId;
        state.user.isNewUser = action.payload.user.isNewUser;

        state.authToken = action.payload.token;
      })
      .addCase(checkVerificationCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as AuthError;
      })

    // -------------------------
    // ADD USER TO DATABASE
    // -------------------------
    builder
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
        state.error = action.payload as AuthError;
      });
  },
});

export const {
  setVerificationCode,
  setUser,
  setToken,
  signOut,
  setIsNewUser,
} = authSlice.actions;

export default authSlice.reducer;
