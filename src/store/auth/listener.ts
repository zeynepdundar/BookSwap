import { createListenerMiddleware } from "@reduxjs/toolkit";
import AsyncStore from "@/utils/AsyncStore";
import {
  checkVerificationCode,
  createUserInDatabaseAsync,
} from "./thunks";
import { fetchUserProfileAsync } from "@/store/profile";
import { setProfileData } from "@/store/profile/slice";
import { setIsNewUser, setToken, setUser } from "./slice";

export const authListener = createListenerMiddleware();


authListener.startListening({
  matcher: (
    action
  ): action is ReturnType<typeof checkVerificationCode.fulfilled> =>
    action.type === "auth/checkVerificationCode/fulfilled",

  effect: async (action, listenerApi) => {
    try {
      const { user, token } = action.payload;

      await AsyncStore.setItem("authToken", token);

      listenerApi.dispatch(setUser(user));
      listenerApi.dispatch(setToken(token));

      let userId;

      if (user.isNewUser) {
        const result = await listenerApi
          .dispatch(createUserInDatabaseAsync(token))
          .unwrap();

        userId = result.user_id;
        listenerApi.dispatch(setIsNewUser(true));
        listenerApi.dispatch(setProfileData({ id: userId }));
        return;
      }

      const profile = await listenerApi
        .dispatch(fetchUserProfileAsync(user.firebaseUserId))
        .unwrap();

      listenerApi.dispatch(setProfileData(profile));
    } catch (error) {
      console.error("Auth listener failed:", error);
    }
  }
});