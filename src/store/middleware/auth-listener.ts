import { createListenerMiddleware } from "@reduxjs/toolkit";
import AsyncStore from "@/utils/AsyncStore";
import { checkVerificationCode } from "@/store/auth/auth-actions";
import { setToken, setUser } from "@/store/auth/auth-slice";
import { addUserToDatabaseAsync } from "@/store/auth/auth-actions";
import { fetchUserProfileAsync } from "@/store/profile/profile-actions";

export const authListener = createListenerMiddleware();

authListener.startListening({
  actionCreator: checkVerificationCode.fulfilled,
  effect: async (action, listenerApi) => {
    const { user, token } = action.payload;
    // 1. persist token
    await AsyncStore.setItem("authToken", token);

    // 2. branch logic (new vs existing user)
    if (user.isNewUser) {
      listenerApi.dispatch(addUserToDatabaseAsync(token));
    } else {
      listenerApi.dispatch(fetchUserProfileAsync(user.firebaseUserId));
    }
  },
});