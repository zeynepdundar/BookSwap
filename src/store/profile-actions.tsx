import { createAsyncThunk } from "@reduxjs/toolkit";
import { setIsNewUser } from "./auth-slice";
import { RootState } from "./types";
import * as Localization from "expo-localization";

const API_ENDPOINT = "http://3.76.204.31:5001";

export const updateUserProfileAsync = createAsyncThunk(
  "profile/updateUserProfile",
  async (profileData: any, { getState, dispatch }) => {
    try {
      const userId = (getState() as RootState).auth.user.id;

      const deviceLanguage = Localization.locale.split("-")[0];

      const body = {
        id: userId.toString(), // Use the retrieved user ID
        name: profileData.name,
        birthdate: profileData.birthdate,
        gender: profileData.gender,
        language_preference: deviceLanguage,
        wished_editions: profileData.wishlistBookIds,
        owned_editions: profileData.libraryBookIds,
        push_tokens: ["ExponentPushToken[iskGN6Io5dqFbfasNwDm4g]"],
      };

      const response = await fetch(`${API_ENDPOINT}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzMmNjMWNiMjg5ZGQ0NjI2YTQzNWQ3Mjk4OWFlNDMyMTJkZWZlNzgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9vay1zd2FwLTJkOWE1IiwiYXVkIjoiYm9vay1zd2FwLTJkOWE1IiwiYXV0aF90aW1lIjoxNzAzMjQ4MjUwLCJ1c2VyX2lkIjoiMnZXNFJhRUpCc1RCYVI0VTloTHpudUtsTzZJMiIsInN1YiI6IjJ2VzRSYUVKQnNUQmFSNFU5aEx6bnVLbE82STIiLCJpYXQiOjE3MDM0MjU0MzMsImV4cCI6MTcwMzQyOTAzMywicGhvbmVfbnVtYmVyIjoiKzE1NTU2NjYxMjM0IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMTU1NTY2NjEyMzQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.p4gFmzGQKYv22zrsbo-zatwMeTs8WhbrFn6FFTkLY76PsfF2flZyEQ3hLFfDU3zy0BmS8SFgLyA6DQVp4uDGebtYNfxdCkHc6AB1Ni0fAF7FXoI_J3jQ8dUDA2cUQ9wQOzjaVcboiciX89Begp_GtM19EcOoK045Q1DIw-cWta0NGY-BjngJ11jWEYDJb1pzexsjTZiA6CuQghhq8sTZsvstwueCdhre4gwQzARJaXVzEQMfHWMekUacGqjkDa90onwNChlMzQtxdOu0KDrpgsZj7-8Oi5EQODnFl6xHp5g42vB64HNS2Kc2_frgQA1yxyxNeYaKVMB1ia6y_QmuOw"}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      console.log("Profile is updated on database.", response);
      dispatch(setIsNewUser(false));

      return response.json();
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }
);

export const uploadProfileImageAsync = createAsyncThunk(
  "profile/uploadProfileImage",
  async (_, { getState }) => {
    const userId = (getState() as RootState).auth.user.id;
    const imageData = (getState() as RootState).profile.profile.imageData;

    try {
      var formdata: any = new FormData();
      const filename = "idea_keymap_2015-01-20_131810.png"; // replace this with the actual file name
      formdata.append("file", {
        uri: imageData.uri,
        name: filename,
        type: "image/png", // replace this with the appropriate MIME type if needed
      });

      var requestOptions: any = {
        method: "POST",
        body: formdata,
        redirect: "follow",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await fetch(
        `https://c5c2-46-2-225-160.ngrok-free.app/user/${userId}/upload`,
        requestOptions
      );
      const data = await response.json(); // Assuming the server returns JSON
    } catch (error) {
      console.error("Error getting image blob:", error);
    }
  }
);
