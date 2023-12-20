import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authSlice from "./auth-slice";
import profileSlice from "./profile-slice";

const store = configureStore({
  reducer: { auth: authSlice, profile: profileSlice },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Ignore these action types
      serializableCheck: {
        ignoredActions: ["auth/checkVerificationCode/fulfilled", "auth/verifyPhoneNumber/fulfilled"],
        ignoredPaths: ["auth"],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch();

export default store;
