import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,

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
