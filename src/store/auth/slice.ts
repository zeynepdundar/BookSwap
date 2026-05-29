import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  createUserInDatabaseAsync,
  checkVerificationCode,
  verifyPhoneNumber,
} from "./thunks";
import { AuthError, AuthState } from "./types";

const initialState: AuthState = {
  loading: false,
  error: null,
  user: { isNewUser: false, firebaseUserId: null },
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
      console.log("action",action)
    },
    setVerificationCode(state, action: PayloadAction<string>) {
      state.verificationCode = action.payload;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.authToken = action.payload;
      state.isAuthenticated = !!action.payload;
        console.log("action",!!action.payload, action)
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

      .addCase(checkVerificationCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // NOTE: Avoid race condition between auth state and profile hydration
      // Navigation should not rely on checkVerificationCode.fulfilled payload
      // because profile/user state is resolved asynchronously via listener flow

      // NOTE: avoid race condition — isAuthenticated is already handled by setToken; navigation should wait for full auth flow (token + profile)

      .addCase(checkVerificationCode.fulfilled, (state, action) => {
        state.loading = false;
        //  state.isAuthenticated = true;
        //  state.user = action.payload.user;
        //  state.authToken = action.payload.token;
      })
      .addCase(checkVerificationCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as AuthError;
      })

      // -------------------------
      // ADD USER TO DATABASE
      // -------------------------
      .addCase(createUserInDatabaseAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserInDatabaseAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createUserInDatabaseAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as AuthError;
      });
  },
});

export const {
  setUser,
  setVerificationCode,
  setToken,
  setIsNewUser,
  signOut,
} = authSlice.actions;

export const authReducer = authSlice.reducer;