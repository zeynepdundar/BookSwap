import { createAsyncThunk } from "@reduxjs/toolkit";
import auth from "@react-native-firebase/auth";
import { AuthEndpoints } from "@/api/endpoints";
import { AuthError, VerifyCodePayload } from "./types";

export const verifyPhoneNumber = createAsyncThunk<
  { verificationId: string },
  string,
  { rejectValue: AuthError }
>(
  "auth/verifyPhoneNumber",
  async (phoneNumber: string, thunkAPI) => {

    try {
      const confirmationResult = await auth().signInWithPhoneNumber(
        phoneNumber
      );
      return {
        verificationId: confirmationResult.verificationId,
      };

    } catch (error: any) {
      console.error("Error verifying phone number", error);
      let errorMessage = "Failed to verify phone number";
      switch (error?.code) {
        case "auth/invalid-phone-number":
          errorMessage =
            "Invalid phone number.";
          break;
        case "auth/missing-phone-number":
          errorMessage =
            "Phone number is required";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many requests. Try again later";
          break;
        case "auth/quota-exceeded":
          errorMessage = "Quota exceeded. Try again later.";
          break;

      }
      return thunkAPI.rejectWithValue({
        type: "verifyPhoneNumberError",
        message: errorMessage,
      });
    }
  }
);

export const checkVerificationCode = createAsyncThunk<
  { user: { firebaseUserId: string; isNewUser: boolean }; token: string },
  VerifyCodePayload,
  { rejectValue: AuthError }
>(
  "auth/checkVerificationCode",
  async (payload, thunkAPI) => {
    try {
      const { verificationId, verificationCode } = payload;

      const credential = auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );

      const userCredential = await auth().signInWithCredential(credential);

      const token = await userCredential.user.getIdToken();

      // TODO(AUTH): Verify `additionalUserInfo` reliability in @react-native-firebase/auth (may be undefined or unstable across flows)
      const isNewUser = safeGetIsNewUser(userCredential);

      const result = {
        user: {
          firebaseUserId: userCredential.user.uid,
          isNewUser,
        },
        token,
      };

      return result;
    } catch (error: any) {

      return thunkAPI.rejectWithValue({
        type: "checkVerificationCodeError",
        message: error?.message ?? "Verification failed",
      });
    }
  }
);

/*
 * Safely extracts `isNewUser` from Firebase userCredential.
 * `additionalUserInfo` can be undefined or occasionally throw in @react-native-firebase/auth.
 */
const safeGetIsNewUser=(userCredential: any): boolean =>{
  try {
    const info = userCredential?.additionalUserInfo;
    return info?.isNewUser ?? false;
  } catch (e) {
    console.log("[checkVerificationCode] additionalUserInfo access threw:", e);
    return false;
  }
}

export const createUserInDatabaseAsync = createAsyncThunk<
  { user_id: string },
  string,
  { rejectValue: AuthError }
>(
  "auth/addUserToDatabase",
  async (token: string, thunkAPI) => {
    try {
      const response = await fetch(AuthEndpoints.ADD_USER_TO_DATABASE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue({
          type: "createUserError",
          message: "Failed to create user",
        });
      }

      console.log("New user created:", result.user_id);

      return {
        user_id: result.user_id,
      };
    } catch (error: any) {
      const message = error?.message ?? "Failed to create user";
      console.error(message);
      return thunkAPI.rejectWithValue({
        type: "createUserError",
        message,
      });
    }
  }
);
