import { createListenerMiddleware } from "@reduxjs/toolkit";
import AsyncStore from "@/utils/AsyncStore";
import {
  checkVerificationCode,
  createUserInDatabaseAsync,
} from "./thunks";
import { fetchUserProfileAsync } from "@/store/profile";
import { setProfileData } from "@/store/profile/slice";
import { setToken, setUser } from "./slice";

export const authListener = createListenerMiddleware();


authListener.startListening({
  matcher: (
    action
  ): action is ReturnType<typeof checkVerificationCode.fulfilled> =>
    action.type === "auth/checkVerificationCode/fulfilled",

  effect: async (action, listenerApi) => {
    try {
      const { user, token } = action.payload;

      // AUTH FIRST
      await AsyncStore.setItem("authToken", token);

      console.log("Auth token stored successfully:", user);

      // Set user state before token so navigation reads isNewUser correctly on first render
      listenerApi.dispatch(setUser(user));

      listenerApi.dispatch(setToken(token));

            console.log("Auth token stored successfully2:", user);

      // THEN background sync
      if (user.isNewUser) {
        const { user_id } = await listenerApi
          .dispatch(createUserInDatabaseAsync(token))
          .unwrap();
        listenerApi.dispatch(setProfileData({ id: user_id }));
      }

      else {await listenerApi.dispatch(
        fetchUserProfileAsync(user.firebaseUserId)
      );
      }
    } catch (error) {
      console.error("Auth listener failed:", error);
    }
  },
});