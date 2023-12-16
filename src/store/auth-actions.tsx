import { createAsyncThunk } from "@reduxjs/toolkit";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setPhoneNumber, setToken, setUser } from "./auth-slice";

export const verifyPhoneNumber = createAsyncThunk(
  "userAuth/verifyPhoneNumber",
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
  "userAuth/checkVerificationCode",
  async (credentials: any, thunkAPI) => {
    try {
      const { confirmationResult, verificationCode } = credentials;
      const userCredential = await confirmationResult.confirm(verificationCode);
      const isNewUser = userCredential.additionalUserInfo.isNewUser;
      const user = await auth().currentUser.getIdTokenResult();

      thunkAPI.dispatch(
        setUser({
          isNewUser: isNewUser,
          firebaseUserId: userCredential.user.uid,
        })
      );

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
  "userAuth/resendVerificationCode",
  async (k:any, { rejectWithValue }) => {
    try {
      const { confirmationResult} = k;


      // Replace the following with your logic to trigger the resend
      // e.g., if you have a confirmationResult stored in the state, you can use confirmationResult.resend()
      // const confirmationResult = getConfirmationResultFromState(); // Implement this function
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
