import { createAsyncThunk } from "@reduxjs/toolkit";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setPhoneNumber, setToken, setUser } from "./auth-slice";



export const updateUserProfileAsync = (profileData) => async (dispatch) => {
    try {
      // const response = await updateUserProfile(profileData);
      // // Dispatch actions to handle profile update response
      // dispatch(setProfileData(response.profile));
      // return response;
    } catch (error) {
      // Handle profile update error
      console.error('Error updating user profile:', error);
      throw error;
    }
};



export const fetchUserProfileData = createAsyncThunk(
  "user/fetchProfileData",
  async () => {
      // const response = 
  }
);

export const setUserProfileData = createAsyncThunk(
  "user/setProfileData",
  async () => {
      // const response = 
  }
);
