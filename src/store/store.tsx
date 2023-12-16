import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authSlice from "./auth-slice";
import bookSlice from "./book-slice";

const store = configureStore({
  reducer: { userAuth: authSlice, bookList: bookSlice },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Ignore these action types
      serializableCheck: {
        ignoredActions: ["userAuth/checkVerificationCode/fulfilled", "userAuth/verifyPhoneNumber/fulfilled"],
        ignoredPaths: ["userAuth"],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch();

export default store;
