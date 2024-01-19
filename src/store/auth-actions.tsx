import { createAsyncThunk } from "@reduxjs/toolkit";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setIsNewUser, setPhoneNumber, setToken, setUser } from "./auth-slice";
import { fetchUserProfileAsync } from "./profile-actions";
import { setProfileData } from "./profile-slice";

const API_ENDPOINT = "http://localhost:5001";

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
        thunkAPI.dispatch(setIsNewUser(false));
      }
      
      thunkAPI.dispatch(setToken(user.token));
      await AsyncStorage.setItem("authToken", user.token);

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

//Check it later on
export const resendVerificationCode = createAsyncThunk(
  "auth/resendVerificationCode",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const confirmationResult = state.auth.confirmationResult;

      if (!confirmationResult) {
        throw new Error("Confirmation result not available.");
      }

      // Perform the resend operation
      await confirmationResult.resend();

      // For illustration purposes, assume a simple async operation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // If successful, you can return any data you need
      return { success: true };
    } catch (error) {
      // If there's an error, you can reject the promise with the error
      return rejectWithValue(error);
    }
  }
);

export const addUserToDatabaseAsync = createAsyncThunk(
  "auth/addUserToDatabase",
  async (token: string, thunkAPI) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/create_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      // if (!response.ok) {
      //   throw new Error("Failed to create user");
      // }
      console.log("New user is added to database with", result.user_id);
      thunkAPI.dispatch(setProfileData({id: result.user_id}));
      return result;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
);
