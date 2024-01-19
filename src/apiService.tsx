const LOCAL_HOST_ENDPOINT = "http://localhost:5001";
const NGROK_ENDPOINT = "https://44dd-188-119-40-101.ngrok-free.app";


import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";

export const fetchUserProfileData = async (firebaseUserId) => {
  console.log("Fetching user profile data")
  const response = await fetch(
    `${LOCAL_HOST_ENDPOINT}/users/${firebaseUserId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${"your_access_token"}`, // Replace with your actual access token
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user profile on api call");
  }

  const result = await response.json();
  console.log("User profile",result)

  const image = await fetchProfileImage(result.id)


  // Transform the response object
  const profile = {
    id: result.id,
    languagePreference: result.language_preference,
    gender: result.gender,
    name: result.name,
    wishlistBook: result.wished_editions,
    libraryBook: result.owned_editions,
  };

  return profile;
};

export const updateUserProfileData = async ( profileData) => {
  const deviceLanguage = Localization.locale.split("-")[0];
  const wishlistBookIds = profileData.wishlistBook.map((item) => item.id);
  const libraryBookIds = profileData.wishlistBook.map((item) => item.id);
  const pushNotificationToken= await AsyncStorage.getItem("pushToken");


  const profile = {
    id: profileData.id.toString(), // Use the retrieved user ID
    name: profileData.name,
    birthdate: profileData.birthdate,
    gender: profileData.gender,
    language_preference: deviceLanguage,
    wished_editions: wishlistBookIds,
    owned_editions: libraryBookIds,
    // push_tokens: pushNotificationToken,
    push_tokens: ["ExponentPushToken[iskGN6Io5dqFbfasNwDm4g]"]
  };


  const response = await fetch(`${LOCAL_HOST_ENDPOINT}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzMmNjMWNiMjg5ZGQ0NjI2YTQzNWQ3Mjk4OWFlNDMyMTJkZWZlNzgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9vay1zd2FwLTJkOWE1IiwiYXVkIjoiYm9vay1zd2FwLTJkOWE1IiwiYXV0aF90aW1lIjoxNzAzMjQ4MjUwLCJ1c2VyX2lkIjoiMnZXNFJhRUpCc1RCYVI0VTloTHpudUtsTzZJMiIsInN1YiI6IjJ2VzRSYUVKQnNUQmFSNFU5aEx6bnVLbE82STIiLCJpYXQiOjE3MDM0MjU0MzMsImV4cCI6MTcwMzQyOTAzMywicGhvbmVfbnVtYmVyIjoiKzE1NTU2NjYxMjM0IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMTU1NTY2NjEyMzQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.p4gFmzGQKYv22zrsbo-zatwMeTs8WhbrFn6FFTkLY76PsfF2flZyEQ3hLFfDU3zy0BmS8SFgLyA6DQVp4uDGebtYNfxdCkHc6AB1Ni0fAF7FXoI_J3jQ8dUDA2cUQ9wQOzjaVcboiciX89Begp_GtM19EcOoK045Q1DIw-cWta0NGY-BjngJ11jWEYDJb1pzexsjTZiA6CuQghhq8sTZsvstwueCdhre4gwQzARJaXVzEQMfHWMekUacGqjkDa90onwNChlMzQtxdOu0KDrpgsZj7-8Oi5EQODnFl6xHp5g42vB64HNS2Kc2_frgQA1yxyxNeYaKVMB1ia6y_QmuOw"}`,
    },
    body: JSON.stringify(profile),
  });

  if (!response.ok) {
    throw new Error("Failed to update user profile on api call");
  }
  console.log("Updated user profile")
  uploadProfileImage(profileData.id.toString(),profileData.imageData)

};


export const fetchProfileImage = async (userId) => {
  const response = await fetch(
    `${NGROK_ENDPOINT}/profile/${userId}/photo`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${"your_access_token"}`, // Replace with your actual access token
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user profile on api call");
  }

    const result = await response.json()
  console.log("response image" ,result)

  return result


};
export const uploadProfileImage = async (userId, imageData) => {
  const formdata: any = new FormData();
  const filename = "idea_keymap_2015-01-20_131810.png"; // replace this with the actual file name

  formdata.append("file", {
    uri: imageData.uri,
    name: filename,
    type: "image/png", // replace this with the appropriate MIME type if needed
  });

  const requestOptions: RequestInit = {
    method: "POST",
    body: formdata,
    redirect: "follow",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const endpoint = `https://44dd-188-119-40-101.ngrok-free.app/user/${userId}/upload`;

  try {
    const response = await fetch(endpoint, requestOptions);

    if (!response.ok) {
      throw new Error("Failed to upload image on api call");
    }

    //  await response.json(); // Assuming the server returns JSON

  } catch (error) {
    console.error("Failed to upload image on api call:", error);
    throw error;
  }
};
