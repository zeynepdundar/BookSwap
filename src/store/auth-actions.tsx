import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/compat/app";


export const login = createAsyncThunk(
  "userContent/login",
  async (credentials: any, { rejectWithValue }) => {
    const { verificationId, code } = credentials;
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        code
      );
      const result = await firebase.auth().signInWithCredential(credential);

      if (result.additionalUserInfo.isNewUser) {
        AsyncStorage.setItem("token", result.user?.getIdToken().toString());
        console.log("User added", result.user?.getIdToken().toString());
      }
      console.log("User logged in", result.user); 
      return result     

    } catch (err) {
      // if (!err.response) {
      //   throw err
      // }
      // console.log(" rejectWithValue(err.response.data)", rejectWithValue(err.response.data))
      // return rejectWithValue(err.response.data)

      switch (err.code) {
        case "auth/invalid-verification-code":
          break;
        default:
          break;
      }
      console.log("error", err)
      return err.code;
    }
  }
);

export const signOut = createAsyncThunk("userContent/signOut", async () => {
  try {
    await firebase.auth().signOut();
  } catch (e) {
    console.log(e);
  }
});
