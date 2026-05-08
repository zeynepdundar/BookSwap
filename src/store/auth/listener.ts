import { createListenerMiddleware } from "@reduxjs/toolkit";
import AsyncStore from "@/utils/AsyncStore";
import {
  checkVerificationCode,
  createUserInDatabaseAsync,
} from "./thunks";
import { fetchUserProfileAsync } from "@/store/profile";
import { setToken } from "./slice";

export const authListener = createListenerMiddleware();


authListener.startListening({
  matcher: (action): action is ReturnType<typeof checkVerificationCode.fulfilled> =>
    action.type === "auth/checkVerificationCode/fulfilled",
  effect: async (action, listenerApi) => {
    try {
      const { user, token } = action.payload;

      // 1. Persist token
      await AsyncStore.setItem("authToken", token);

      // 2. Create user if new
      if (user.isNewUser) {
        await listenerApi
          .dispatch(createUserInDatabaseAsync(token))
          .unwrap();
      }

      // 3. Fetch profile
      await listenerApi.dispatch(
        fetchUserProfileAsync(user.firebaseUserId)
      );

      // 4. Set the auth flag
      listenerApi.dispatch(setToken(token));
    } catch (error) {
      console.error("Auth listener failed:", error);
    }
  },
});