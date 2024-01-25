import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import { ProfileEndpoints } from "./api-endpoints";
import { UserProfile } from "./store/profile-slice";

export const fetchReceivedOffer = async (userId) => {
  const response = await fetch(ProfileEndpoints.FETCH_RECEIVED_OFFER(userId), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${"your_access_token"}`, // Replace with your actual access token
    },
  });


  if (!response.ok) {
    throw new Error("Failed to fetch user profile on api call");
  }

  const result = await response.json();
  


  const transformedData = result.map((item) => ({
    id: item.id,
    receiverUser:{
      id:item.receiver_id,
      name: item.receiver_user_name
    },
    createdAt: item.created_at,
    requestedBook: item.requested_editions,
    offeredBook: item.offered_editions
  }));

  console.log("*****trade",transformedData);

  return transformedData;
};

export const updateUserProfileData = async (profileData) => {
  const deviceLanguage = Localization.locale.split("-")[0];
  const wishlistBookIds = profileData.wishlistBook.map((item) => item.id);
  const libraryBookIds = profileData.libraryBook.map((item) => item.id);
  const pushNotificationToken = await AsyncStorage.getItem("pushToken");

  const profile = {
    id: profileData.id.toString(), // Use the retrieved user ID
    name: profileData.name,
    birthdate: profileData.birthdate,
    gender: profileData.gender,
    language_preference: deviceLanguage,
    wished_editions: wishlistBookIds,
    owned_editions: libraryBookIds,
    // push_tokens: pushNotificationToken,
    push_tokens: ["ExponentPushToken[iskGN6Io5dqFbfasNwDm4g]"],
  };

  const response = await fetch(`${ProfileEndpoints.FETCH_USER_PROFILE}`, {
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
  console.log("Updated user profile");
  uploadProfileImage(profileData.id.toString(), profileData.imageData);
};

export const fetchProfileImage = async (userId) => {
  try {
    const response:any = await fetch(ProfileEndpoints.FETCH_USER_PHOTO(userId), {
      method: "GET",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzMmNjMWNiMjg5ZGQ0NjI2YTQzNWQ3Mjk4OWFlNDMyMTJkZWZlNzgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9vay1zd2FwLTJkOWE1IiwiYXVkIjoiYm9vay1zd2FwLTJkOWE1IiwiYXV0aF90aW1lIjoxNzAzMjQ4MjUwLCJ1c2VyX2lkIjoiMnZXNFJhRUpCc1RCYVI0VTloTHpudUtsTzZJMiIsInN1YiI6IjJ2VzRSYUVKQnNUQmFSNFU5aEx6bnVLbE82STIiLCJpYXQiOjE3MDM0MjU0MzMsImV4cCI6MTcwMzQyOTAzMywicGhvbmVfbnVtYmVyIjoiKzE1NTU2NjYxMjM0IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMTU1NTY2NjEyMzQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.p4gFmzGQKYv22zrsbo-zatwMeTs8WhbrFn6FFTkLY76PsfF2flZyEQ3hLFfDU3zy0BmS8SFgLyA6DQVp4uDGebtYNfxdCkHc6AB1Ni0fAF7FXoI_J3jQ8dUDA2cUQ9wQOzjaVcboiciX89Begp_GtM19EcOoK045Q1DIw-cWta0NGY-BjngJ11jWEYDJb1pzexsjTZiA6CuQghhq8sTZsvstwueCdhre4gwQzARJaXVzEQMfHWMekUacGqjkDa90onwNChlMzQtxdOu0KDrpgsZj7-8Oi5EQODnFl6xHp5g42vB64HNS2Kc2_frgQA1yxyxNeYaKVMB1ia6y_QmuOw"}`, // Replace with your actual access token
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile image from db");
    }

    console.log("User profile image", response.bodyBlob._data.blobId)
    const imageBlob = await response.blob();
    console.log("imageBlob", imageBlob)

    const uri = URL.createObjectURL(imageBlob);
    console.log("uri", uri)


    return `data:image/jpeg;base64,${response.bodyBlob._data.blobId}`;
  } catch (err) {
    console.log(err.message);
  }
};
export const uploadProfileImage = async (userId, imageUri) => {
  const formdata: any = new FormData();
  const filename = "idea_keymap_2015-01-20_131810.png"; // replace this with the actual file name

  formdata.append("file", {
    uri: imageUri,
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
  

  try {
    const response = await fetch(ProfileEndpoints.UPLOAD_USER_PHOTO(userId), requestOptions);

    if (!response.ok) {
      throw new Error("Failed to upload image to db");
    }
  } catch (error) {
    console.error("off",error);
  }
};

export const fetchUserProfileData = async (firebaseUserId:string) => {
  const response = await fetch(
    ProfileEndpoints.FETCH_USER_DATA(firebaseUserId),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6ImQxNjg5NDE1ZWMyM2EzMzdlMmJiYWE1ZTNlNjhiNjZkYzk5MzY4ODQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9vay1zd2FwLTJkOWE1IiwiYXVkIjoiYm9vay1zd2FwLTJkOWE1IiwiYXV0aF90aW1lIjoxNzA0NjMzMDU0LCJ1c2VyX2lkIjoiVUxSRkp3WVZLdlNCR2V1RDZKWmcwRTRrOEJGMiIsInN1YiI6IlVMUkZKd1lWS3ZTQkdldUQ2SlpnMEU0azhCRjIiLCJpYXQiOjE3MDQ2MzMwNTQsImV4cCI6MTcwNDYzNjY1NCwicGhvbmVfbnVtYmVyIjoiKzE1NTU2NjYxMjM0IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMTU1NTY2NjEyMzQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.AwcM4gpbryzgZTKAlc-VvGwAWWoW2Qiqhn3RrhiNp7ShRQ8T9QxnS6ZdyRUhInkz6yOhTf-BPZ2SlMlTvfENpgjUnOda4P6OWVwXpObbkS2RFQ2zQp00o_7-pCYQ6PgbbDH1pApd6F0ujk_yChhw4QSCuv7eQ6hD7zWW7akaR5aM6e_UO1RcMNXN_jrmE3cBtBOsf0ci-Emf9YbYBcyQa4OWTExelhHn2p11KjrML4KZytiHU17Q9VUzDCxPwLu5P4uMJwpXM9J_kMhvPxBJXXWAZl9cCGDCslXYVdWWiWqwx8uLgyX4vI0jzQPZHjO5-rT9XekiulOpRN-M02iODA"}`, // Replace with your actual access token
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user profile from db");
  }

  const result = await response.json();

  const imageUri = await fetchProfileImage(result.id);
  const receivedOffer = await fetchReceivedOffer("1");
  // sentOffer: [],


  // Transform the response object
  const profile: UserProfile = {
    id: result.id,
    name: result.name,
    birthdate: result.birthdate,
    imageData: imageUri,
    gender: result.gender,
    languagePreference: result.language_preference,
    wishlistBook: [...result.wished_editions],
    libraryBook:[...result.owned_editions],
    receivedOffer: receivedOffer
  };
  console.log("****************profile",result, profile);
  return profile;
};
