import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import firebase from "firebase/compat/app";

export const userAuth = createAsyncThunk(
  "userContent/auth",
  async (user: any, { rejectWithValue }) => {
    let registeredUser = {
      id: user.uid,
      firstName: user.displayName,
    };
    return user;
  }
);

export const signOut = createAsyncThunk("userContent/signOut", async () => {
  try {
    // await firebase.auth().signOut();
  } catch (e) {
    console.log(e);
  }
});
