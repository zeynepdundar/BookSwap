import { createAsyncThunk } from "@reduxjs/toolkit";
import auth from "@react-native-firebase/auth";
import { setPhoneNumber, setToken, setUser } from "./auth-slice";
import { fetchUserProfileAsync } from "./profile-actions";
import { setProfileData } from "./profile-slice";
import { AuthEndpoints } from "../api/endpoints";
import AsyncStore from "../utils/AsyncStore";

export const verifyPhoneNumber = createAsyncThunk(
  "auth/verifyPhoneNumber",
  async (phoneNumber: string, thunkAPI) => {
    try {
      const confirmationResult = await auth().signInWithPhoneNumber(
        phoneNumber
      );
      thunkAPI.dispatch(setPhoneNumber(phoneNumber));
      return confirmationResult;
    } catch (error) {
      let errorMessage = "Failed to verify phone number";
      switch (error.code) {
        case "auth/invalid-phone-number":
          errorMessage =
            "Invalid phone number. Please enter a valid phone number.";
          break;
        case "auth/missing-phone-number":
          errorMessage =
            "Missing phone number. Please enter your phone number.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many requests. Please try again after 5 minutes.";
          break;
        case "auth/quota-exceeded":
          errorMessage = "Verification quota exceeded. Please try again later.";
          break;
        default:
          errorMessage =
            "An error occurred during phone verification. Please try again.";
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
  async (credentials: any, thunkAPI) => {
    try {
      const { confirmationResult, verificationCode } = credentials;
      const userCredential = await confirmationResult.confirm(verificationCode);
      const firebaseUserId = userCredential.user.uid;
      const isNewUser = userCredential.additionalUserInfo.isNewUser;
      const user = await auth().currentUser.getIdTokenResult();

      thunkAPI.dispatch(
        setUser({
          isNewUser: isNewUser,
          firebaseUserId: firebaseUserId,
        })
      );

      if (isNewUser) thunkAPI.dispatch(addUserToDatabaseAsync(user.token));
      else {
        thunkAPI.dispatch(fetchUserProfileAsync(firebaseUserId));
      }

      thunkAPI.dispatch(setToken(user.token));
      await AsyncStore.setItem("authToken", user.token);

      return userCredential;
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
