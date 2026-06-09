import { ProfileEndpoints } from "@/api/profile.endpoints";
import AsyncStore from "@/utils/AsyncStore";
import { createBookData } from "@/utils/helper";

export const fetchUserProfileData = async (firebaseUserId: string) => {
  try {

    const profileResponse = await fetch(
      ProfileEndpoints.FETCH_USER_DATA(firebaseUserId),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${"YOUR_ACCESS_TOKEN"}`, // Replace with your actual access token
        },
      }
    );
    const result = await profileResponse.json();

    if (!profileResponse.ok) {
      throw new Error(
        "Failed to fetch user profile from db [fetchUserProfileData]"
      );
    }

    // Once we have the result, we can fetch other related data in parallel
 const imageData = await fetchProfileImageUrl(result.id)
    .catch((err) => {
      console.error("Image fetch failed:", err);
      return null;
    });

    // Construct the user profile object
    const profile: any = {
      id: result.id,
      name: result.name,
      birthdate: result.birthdate,
      imageData,
      gender: result.gender,
      languagePreference: result.language_preference,
      wishlistBook: createBookData(result.wished_editions),
      libraryBook: createBookData(result.owned_editions),
      //receivedOffer: receivedOffers,
      //sentOffer: sentOffers,
     // historyList: historyList,
    };

    return profile;
  } catch (error) {
    console.error("Error fetching user profile data:", error);
    throw error;
  }
};

export const updateUserProfileData = async (profileData: any) => {
  const pushNotificationToken = await AsyncStore.getItem<string>(
    "pushToken",
    null
  );

  const payload: any = {
    id: profileData.id.toString(),
  };

  // Map fields ONLY if they exist
  if (profileData.name !== undefined) {
    payload.name = profileData.name;
  }

  if (profileData.gender !== undefined) {
    payload.gender = profileData.gender;
  }

  if (profileData.birthdate !== undefined) {
    payload.birthdate = profileData.birthdate;
  }
  if (profileData.wishlistBookIds) {
    payload.wished_editions = profileData.wishlistBookIds;
  }

  if (profileData.libraryBookIds) {
    payload.owned_editions = profileData.libraryBookIds;
  }

  if (profileData.languagePreference !== undefined) {
    payload.language_preference = profileData.languagePreference;
  }

  if (pushNotificationToken) {
    payload.push_tokens = [pushNotificationToken];
  }

  // Image upload (side-effect, correct place)
  try {
console.log("jbhhj",profileData)    
    if (profileData.imageData) {
      await uploadProfileImage(
        profileData.id,
        profileData.imageData
      );
    }
  } catch (error: any) {
    console.error("Failed to upload profile image", error.message);
    throw new Error("Failed to upload profile image");
  }

  // API request
  const response = await fetch(ProfileEndpoints.UPDATE_USER_DATA, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${"YOUR_TOKEN_HERE"}`,
    },
    body: JSON.stringify(payload),
  });


  if (!response.ok) {
    const result = await response.json().catch(() => null);
    console.error("Failed to update profile", result);
    throw new Error("Failed to update profile");
  }

  return response.json().catch(() => ({}));
};

export const fetchProfileImageUrl = async (userId: string) => {
  try {
    const response: any = await fetch(
      ProfileEndpoints.FETCH_USER_PHOTO_URL(userId),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzMmNjMWNiMjg5ZGQ0NjI2YTQzNWQ3Mjk4OWFlNDMyMTJkZWZlNzgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9vay1zd2FwLTJkOWE1IiwiYXVkIjoiYm9vay1zd2FwLTJkOWE1IiwiYXV0aF90aW1lIjoxNzAzMjQ4MjUwLCJ1c2VyX2lkIjoiMnZXNFJhRUpCc1RCYVI0VTloTHpudUtsTzZJMiIsInN1YiI6IjJ2VzRSYUVKQnNUQmFSNFU5aEx6bnVLbE82STIiLCJpYXQiOjE3MDM0MjU0MzMsImV4cCI6MTcwMzQyOTAzMywicGhvbmVfbnVtYmVyIjoiKzE1NTU2NjYxMjM0IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMTU1NTY2NjEyMzQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.p4gFmzGQKYv22zrsbo-zatwMeTs8WhbrFn6FFTkLY76PsfF2flZyEQ3hLFfDU3zy0BmS8SFgLyA6DQVp4uDGebtYNfxdCkHc6AB1Ni0fAF7FXoI_J3jQ8dUDA2cUQ9wQOzjaVcboiciX89Begp_GtM19EcOoK045Q1DIw-cWta0NGY-BjngJ11jWEYDJb1pzexsjTZiA6CuQghhq8sTZsvstwueCdhre4gwQzARJaXVzEQMfHWMekUacGqjkDa90onwNChlMzQtxdOu0KDrpgsZj7-8Oi5EQODnFl6xHp5g42vB64HNS2Kc2_frgQA1yxyxNeYaKVMB1ia6y_QmuOw"}`, // Replace with your actual access token
        },
      }
    );
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Failed to fetch user profile image. Status: ${response.status}, Body: ${body}`);
    }


    const data = await response.json();

    // await AsyncStore.setItem("profile_photo_url", data.profile_photo_url);

    return data.profile_photo_url;
  } catch (err) {
    // console.error("Error fetching profile image:", err.message);
  }
};

export const uploadProfileImage = async (userId, imageUri) => {
  const formdata: any = new FormData();
  const filename = "idea_keymap_2015-01-20_131810.jpg"; // replace this with the actual file name

  formdata.append("file", {
    uri: imageUri,
    name: filename,
    type: "image/jpg", // replace this with the appropriate MIME type if needed
  });

  const requestOptions: RequestInit = {
    method: "POST",
    body: formdata,
    redirect: "follow",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  console.log("Uploading profile image for user:", userId);

  try {
    const response = await fetch(
      ProfileEndpoints.UPLOAD_USER_PHOTO(userId),
      requestOptions
    );

    // const result = await response.json();

    console.log("Profile image upload response status:", response);
    if (!response.ok) {
      if (response.status === 413) {
        console.error("Failed to update profile: Payload Too Large");
        throw new Error(
          "The image size is too large to upload. Please try a smaller image."
        );
      } else {
        const result = await response.json();
        console.error("Failed to update profile", result.data);
        throw new Error("Failed to update profile");
      }
    }
  } catch (error) {
    console.error(error);
  }
};