import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  signInWithPhoneNumber,
  signInWithCredential,
  PhoneAuthProvider,
  getIdToken,
} from "@react-native-firebase/auth";
import { AuthError, VerifyCodePayload } from "./types";
import { AuthEndpoints } from "@/api/auth.endpoints";

export const verifyPhoneNumber = createAsyncThunk<
  { verificationId: string },
  string,
  { rejectValue: AuthError }
>(
  "auth/verifyPhoneNumber",
  async (phoneNumber: string, thunkAPI) => {

    try {
      const confirmationResult = await signInWithPhoneNumber(
        getAuth(),
        phoneNumber
      );
      if (!confirmationResult.verificationId) {
        throw new Error("Missing verificationId from Firebase");
      }
      return {
        verificationId: confirmationResult.verificationId,
      };

    } catch (error: any) {
      console.error("Phone number verification error:", error);
      let errorMessage = "Something went wrong. Please try again";

      switch (error?.code) {
        case "auth/invalid-phone-number":
          errorMessage = "Please enter a valid phone number";
          break;

        case "auth/missing-phone-number":
          errorMessage = "Phone number is required";
          break;

        case "auth/too-many-requests":
          errorMessage = "Too many attempts. Please try again later";
          break;

        case "auth/quota-exceeded":
          errorMessage = "Service limit reached. Please try again later";
          break;

        default:
          errorMessage = "Something went wrong. Please try again";
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

      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );

      const userCredential = await signInWithCredential(getAuth(), credential);

      const token = await getIdToken(userCredential.user);

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
    }
    catch (error: any) {
      let message = "Verification failed. Please try again";

      switch (error?.code) {
        case "auth/invalid-verification-code":
        case "auth/invalid-code":
          message = "The code is incorrect or has expired";
          break;

        case "auth/session-expired":
          message = "Code has expired. Please request a new one";
          break;

        case "auth/too-many-requests":
          message = "Too many attempts. Try again later";
          break;

        default:
          message = "Verification failed. Please try again";
      }

      return thunkAPI.rejectWithValue({
        type: "checkVerificationCodeError",
        message,
      });
    }

  }
);

/*
 * Safely extracts `isNewUser` from Firebase userCredential.
 * `additionalUserInfo` can be undefined or occasionally throw in @react-native-firebase/auth.
 */
const safeGetIsNewUser = (userCredential: any): boolean => {
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
