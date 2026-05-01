import { createAsyncThunk } from "@reduxjs/toolkit";
import auth from "@react-native-firebase/auth";
import { AuthEndpoints } from "@/api/endpoints";
import { setProfileData } from "@/store/profile/profile-slice";
import { AuthError, VerifyCodePayload } from "./auth.types";

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

export const checkVerificationCode = createAsyncThunk(
  "auth/checkVerificationCode",
  async (payload: VerifyCodePayload, thunkAPI) => {
    try {
      const { verificationId, verificationCode } = payload;

      const credential = auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      const userCredential = await auth().signInWithCredential(credential);

      const firebaseUserId = userCredential.user.uid;
      const isNewUser =
        userCredential.additionalUserInfo?.isNewUser ?? false;

      const token = await userCredential.user.getIdToken();


      return {
        user: {
          firebaseUserId,
          isNewUser,
        },
        token,
      };

    } catch (error) {
      let errorMessage = "Failed to verify the code";
      switch (error.code) {
        case "auth/invalid-verification-code":
          errorMessage =
            "Invalid verification code. Please double-check the code and try again.";
          break;
        case "auth/expired-action-code":
          errorMessage =
            "The verification code has expired. Please request a new code.";
          break;
        default:
          errorMessage =
            "An error occurred during verification code entry. Please try again.";
          break;
      }
      return thunkAPI.rejectWithValue({
        type: "checkVerificationCodeError",
        message: errorMessage,
      });
    }
  }
);

export const addUserToDatabaseAsync = createAsyncThunk(
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
        throw new Error("Failed to create user");
      }
      console.log("New user is added to database with", result.user_id);
      thunkAPI.dispatch(setProfileData({ id: result.user_id }));
      // thunkAPI.dispatch(setUser({ id: result.user_id }));
      return result;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
);
