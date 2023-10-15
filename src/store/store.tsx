import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authSlice from "./auth-slice";

const store = configureStore({
  reducer: { userAuth: authSlice },

  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['userContent/login/fulfilled'],
      ignoredPaths: ['userAuth.user']
    },
  }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch();

export default store;
