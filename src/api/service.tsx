import { EditionEndpoints, ProfileEndpoints } from "./endpoints";
import { createBookData, structureOfferData } from "../utils/helper";
import AsyncStore from "../utils/AsyncStore";

import { UserProfile, WISHLIST } from "../constants";

export const updateUserProfileData = async (profileData) => {
  const wishlistBookIds = (profileData.wishlistBook || [])
    .map((item) => item.id || null)
    .filter(Boolean);
  const libraryBookIds = (profileData.libraryBook || [])
    .map((item) => item.id || null)
    .filter(Boolean);

  const pushNotificationToken = await AsyncStore.getItem<string>(
    "pushToken",
    null
  );

  const updatedAttributes: any = {
    id: profileData.id.toString(),
    name: profileData.name,
    gender: profileData.gender,
    wished_editions: wishlistBookIds,
    owned_editions: libraryBookIds,
    language_preference: profileData.languagePreference,
    push_tokens: ["ExponentPushToken[iskGN6Io5dqFbfasNwDm4g]"], // Replace with actual push tokens: pushNotificationToken
  };

  try {
    // Attempt to upload the profile image
    if (profileData.imageData) {
      await uploadProfileImage(
        profileData.id.toString(),
        profileData.imageData
      );
    }
  } catch (error) {
    console.error("Failed to upload profile imagexx", error.message);
    throw new Error("Failed to upload profile imagexxx");
  }
  const response = await fetch(ProfileEndpoints.UPDATE_USER_DATA, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzMmNjMWNiMjg5ZGQ0NjI2YTQzNWQ3Mjk4OWFlNDMyMTJkZWZlNzgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9vay1zd2FwLTJkOWE1IiwiYXVkIjoiYm9vay1zd2FwLTJkOWE1IiwiYXV0aF90aW1lIjoxNzAzMjQ4MjUwLCJ1c2VyX2lkIjoiMnZXNFJhRUpCc1RCYVI0VTloTHpudUtsTzZJMiIsInN1YiI6IjJ2VzRSYUVKQnNUQmFSNFU5aEx6bnVLbE82STIiLCJpYXQiOjE3MDM0MjU0MzMsImV4cCI6MTcwMzQyOTAzMywicGhvbmVfbnVtYmVyIjoiKzE1NTU2NjYxMjM0IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMTU1NTY2NjEyMzQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.p4gFmzGQKYv22zrsbo-zatwMeTs8WhbrFn6FFTkLY76PsfF2flZyEQ3hLFfDU3zy0BmS8SFgLyA6DQVp4uDGebtYNfxdCkHc6AB1Ni0fAF7FXoI_J3jQ8dUDA2cUQ9wQOzjaVcboiciX89Begp_GtM19EcOoK045Q1DIw-cWta0NGY-BjngJ11jWEYDJb1pzexsjTZiA6CuQghhq8sTZsvstwueCdhre4gwQzARJaXVzEQMfHWMekUacGqjkDa90onwNChlMzQtxdOu0KDrpgsZj7-8Oi5EQODnFl6xHp5g42vB64HNS2Kc2_frgQA1yxyxNeYaKVMB1ia6y_QmuOw"}`, // Replace with actual access token
    },
    body: JSON.stringify(updatedAttributes),
  });
  if (!response.ok) {
    const result = await response.json();
    console.error("Failed to update profile", result.data);
    throw new Error("Failed to update profile");
  }
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
      const { status, statusText } = response;
      const body = await response.text(); // Read the body as text or JSON, depending on your API
      console.error(
        `Error fetching user profile image [fetchProfileImage]:\nStatus: ${status}\nMessage: ${statusText}\nBody: ${body}`
      );
      throw new Error(`Failed to fetch user profile image [fetchProfileImage]`);
    }

    const data = await response.json();

    await AsyncStore.setItem("profile_photo_url", data.profile_photo_url);

    return data.profile_photo_url;
  } catch (err) {
    console.error("Error fetching profile image:", err.message);
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

  try {
    const response = await fetch(
      ProfileEndpoints.UPLOAD_USER_PHOTO(userId),
      requestOptions
    );

    // const result = await response.json();

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
export const fetchUserProfileData = async (firebaseUserId: string) => {
  try {
    // Fetch the main profile data first
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
    const [imageURL, receivedOffers, sentOffers, historyList] =
      await Promise.all([
        fetchProfileImageUrl(result.id).catch((error) => {
          console.warn("Error fetching profile image:", error);
          return null; // Fallback value
        }),
        fetchReceivedOffer(result.id).catch((error) => {
          console.warn("Error fetching received offers:", error);
          return []; // Fallback value
        }),
        fetchSentOffer(result.id).catch((error) => {
          console.warn("Error fetching sent offers:", error);
          return []; // Fallback value
        }),
        fetchHistory(result.id).catch((error) => {
          console.warn("Error fetching history:", error);
          return []; // Fallback value
        }),
      ]);

    // Construct the user profile object
    const profile: UserProfile = {
      id: result.id,
      name: result.name,
      birthdate: result.birthdate,
      imageData: imageURL,
      gender: result.gender,
      languagePreference: result.language_preference,
      wishlistBook: createBookData(result.wished_editions),
      libraryBook: createBookData(result.owned_editions),
      receivedOffer: receivedOffers,
      sentOffer: sentOffers,
      historyList: historyList,
    };

    return profile;
  } catch (error) {
    console.error("Error fetching user profile data:", error);
    throw error;
  }
};
export const fetchReceivedOffer = async (userId) => {
  try {
    const response = await fetch(
      ProfileEndpoints.FETCH_RECEIVED_OFFER(userId),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${"your_access_token"}`, // Replace with your actual access token
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch received offers [fetchReceivedOffer]");
    }

    const result = await response.json();
    return structureOfferData(result, "received");
  } catch (error) {
    console.error(error);
    return []; // Return an empty array in case of an error
  }
};
export const fetchSentOffer = async (userId) => {
  try {
    const response = await fetch(ProfileEndpoints.FETCH_SENT_OFFER(userId), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${"your_access_token"}`, // Replace with your actual access token
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch sent offers");
    }

    const result = await response.json();
    return structureOfferData(result, "sent");
  } catch (error) {
    console.error(error);
    return []; // Return an empty array in case of an error
  }
};
export const fetchHistory = async (userId) => {
  try {
    const response = await fetch(ProfileEndpoints.FETCH_HISTORY(userId), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${"your_access_token"}`, // Replace with your actual access token
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch history");
    }

    const result = await response.json();
    return structureOfferData(result, "history");
  } catch (error) {
    console.error(error);
    return []; // Return an empty array in case of an error
  }
};
export const addBookToList = async (userId, bookData) => {
  const editionIds = Array.isArray(bookData)
    ? bookData.map((book) => book.id)
    : [bookData.id];
  const bookType = Array.isArray(bookData) ? bookData[0].type : bookData.type;

  const url =
    bookType === WISHLIST
      ? ProfileEndpoints.ADD_BOOK_TO_WISLIST(userId)
      : ProfileEndpoints.ADD_BOOK_TO_LIBRARY(userId);

  const response = await fetch(`${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzMmNjMWNiMjg5ZGQ0NjI2YTQzNWQ3Mjk4OWFlNDMyMTJkZWZlNzgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9vay1zd2FwLTJkOWE1IiwiYXVkIjoiYm9vay1zd2FwLTJkOWE1IiwiYXV0aF90aW1lIjoxNzAzMjQ4MjUwLCJ1c2VyX2lkIjoiMnZXNFJhRUpCc1RCYVI0VTloTHpudUtsTzZJMiIsInN1YiI6IjJ2VzRSYUVKQnNUQmFSNFU5aEx6bnVLbE82STIiLCJpYXQiOjE3MDM0MjU0MzMsImV4cCI6MTcwMzQyOTAzMywicGhvbmVfbnVtYmVyIjoiKzE1NTU2NjYxMjM0IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMTU1NTY2NjEyMzQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.p4gFmzGQKYv22zrsbo-zatwMeTs8WhbrFn6FFTkLY76PsfF2flZyEQ3hLFfDU3zy0BmS8SFgLyA6DQVp4uDGebtYNfxdCkHc6AB1Ni0fAF7FXoI_J3jQ8dUDA2cUQ9wQOzjaVcboiciX89Begp_GtM19EcOoK045Q1DIw-cWta0NGY-BjngJ11jWEYDJb1pzexsjTZiA6CuQghhq8sTZsvstwueCdhre4gwQzARJaXVzEQMfHWMekUacGqjkDa90onwNChlMzQtxdOu0KDrpgsZj7-8Oi5EQODnFl6xHp5g42vB64HNS2Kc2_frgQA1yxyxNeYaKVMB1ia6y_QmuOw"}`,
    },
    body: JSON.stringify({ edition_ids: editionIds }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    if (responseData.status === "error" && responseData.message) {
      // Handle the specific error message
      console.error(responseData.message);
      return {
        status: responseData.status,
        message: responseData.message,
        existingEditionIds: responseData.existing_edition_ids,
      };
    }
    throw new Error("Failed to add book to list [addBookToList]");
  }
  const addedBooks = Array.isArray(bookData) ? bookData : [bookData];

  const addedBookDetails = addedBooks.map((book) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    publisher: book.publisher,
    coverUrl: book.coverUrl,
  }));

  return addedBookDetails;
};
export const removeBookFromList = async (userId, bookData) => {
  const url =
    bookData.type === WISHLIST
      ? ProfileEndpoints.ADD_BOOK_TO_WISLIST(userId)
      : ProfileEndpoints.ADD_BOOK_TO_LIBRARY(userId);

  const response = await fetch(`${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzMmNjMWNiMjg5ZGQ0NjI2YTQzNWQ3Mjk4OWFlNDMyMTJkZWZlNzgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9vay1zd2FwLTJkOWE1IiwiYXVkIjoiYm9vay1zd2FwLTJkOWE1IiwiYXV0aF90aW1lIjoxNzAzMjQ4MjUwLCJ1c2VyX2lkIjoiMnZXNFJhRUpCc1RCYVI0VTloTHpudUtsTzZJMiIsInN1YiI6IjJ2VzRSYUVKQnNUQmFSNFU5aEx6bnVLbE82STIiLCJpYXQiOjE3MDM0MjU0MzMsImV4cCI6MTcwMzQyOTAzMywicGhvbmVfbnVtYmVyIjoiKzE1NTU2NjYxMjM0IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMTU1NTY2NjEyMzQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.p4gFmzGQKYv22zrsbo-zatwMeTs8WhbrFn6FFTkLY76PsfF2flZyEQ3hLFfDU3zy0BmS8SFgLyA6DQVp4uDGebtYNfxdCkHc6AB1Ni0fAF7FXoI_J3jQ8dUDA2cUQ9wQOzjaVcboiciX89Begp_GtM19EcOoK045Q1DIw-cWta0NGY-BjngJ11jWEYDJb1pzexsjTZiA6CuQghhq8sTZsvstwueCdhre4gwQzARJaXVzEQMfHWMekUacGqjkDa90onwNChlMzQtxdOu0KDrpgsZj7-8Oi5EQODnFl6xHp5g42vB64HNS2Kc2_frgQA1yxyxNeYaKVMB1ia6y_QmuOw"}`,
    },
    body: JSON.stringify({ edition_ids: [bookData.id] }),
  });

  if (!response.ok) {
    throw new Error("Failed to remove book to list [removeBookFromList]");
  }
};
export const fetchMostPopularBooks = async () => {
  const response = await fetch(EditionEndpoints.FETCH_MOST_POPULAR_EDITIONS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6ImQxNjg5NDE1ZWMyM2EzMzdlMmJiYWE1ZTNlNjhiNjZkYzk5MzY4ODQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9vay1zd2FwLTJkOWE1IiwiYXVkIjoiYm9vay1zd2FwLTJkOWE1IiwiYXV0aF90aW1lIjoxNzA0NjMzMDU0LCJ1c2VyX2lkIjoiVUxSRkp3WVZLdlNCR2V1RDZKWmcwRTRrOEJGMiIsInN1YiI6IlVMUkZKd1lWS3ZTQkdldUQ2SlpnMEU0azhCRjIiLCJpYXQiOjE3MDQ2MzMwNTQsImV4cCI6MTcwNDYzNjY1NCwicGhvbmVfbnVtYmVyIjoiKzE1NTU2NjYxMjM0IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMTU1NTY2NjEyMzQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.AwcM4gpbryzgZTKAlc-VvGwAWWoW2Qiqhn3RrhiNp7ShRQ8T9QxnS6ZdyRUhInkz6yOhTf-BPZ2SlMlTvfENpgjUnOda4P6OWVwXpObbkS2RFQ2zQp00o_7-pCYQ6PgbbDH1pApd6F0ujk_yChhw4QSCuv7eQ6hD7zWW7akaR5aM6e_UO1RcMNXN_jrmE3cBtBOsf0ci-Emf9YbYBcyQa4OWTExelhHn2p11KjrML4KZytiHU17Q9VUzDCxPwLu5P4uMJwpXM9J_kMhvPxBJXXWAZl9cCGDCslXYVdWWiWqwx8uLgyX4vI0jzQPZHjO5-rT9XekiulOpRN-M02iODA"}`, // Replace with your actual access token
    },
  });

  if (!response.ok) {
    throw new Error(
      "Failed to fetch most popular books from db [fetchMostPopularBooks]"
    );
  }

  const result = await response.json();

  const transformedData = result.map((item) => ({
    id: item.id,
    title: item.title,
    isbn_13: item.isbn_13 || item.isbn_10,
    coverUrl:
      item.isbn_13 && item.isbn_13 > 0
        ? EditionEndpoints.FETCH_COVER_OL(undefined, item.isbn_13)
        : null,
    author: item.author ? item.author : "",
  }));
  return transformedData;
};
export const fetchBooksByTitle = async (bookTitle: string) => {
  const response = await fetch(
    EditionEndpoints.FETCH_EDITION_BY_TITLE(bookTitle),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6ImQxNjg5NDE1ZWMyM2EzMzdlMmJiYWE1ZTNlNjhiNjZkYzk5MzY4ODQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9vay1zd2FwLTJkOWE1IiwiYXVkIjoiYm9vay1zd2FwLTJkOWE1IiwiYXV0aF90aW1lIjoxNzA0NjMzMDU0LCJ1c2VyX2lkIjoiVUxSRkp3WVZLdlNCR2V1RDZKWmcwRTRrOEJGMiIsInN1YiI6IlVMUkZKd1lWS3ZTQkdldUQ2SlpnMEU0azhCRjIiLCJpYXQiOjE3MDQ2MzMwNTQsImV4cCI6MTcwNDYzNjY1NCwicGhvbmVfbnVtYmVyIjoiKzE1NTU2NjYxMjM0IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMTU1NTY2NjEyMzQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.AwcM4gpbryzgZTKAlc-VvGwAWWoW2Qiqhn3RrhiNp7ShRQ8T9QxnS6ZdyRUhInkz6yOhTf-BPZ2SlMlTvfENpgjUnOda4P6OWVwXpObbkS2RFQ2zQp00o_7-pCYQ6PgbbDH1pApd6F0ujk_yChhw4QSCuv7eQ6hD7zWW7akaR5aM6e_UO1RcMNXN_jrmE3cBtBOsf0ci-Emf9YbYBcyQa4OWTExelhHn2p11KjrML4KZytiHU17Q9VUzDCxPwLu5P4uMJwpXM9J_kMhvPxBJXXWAZl9cCGDCslXYVdWWiWqwx8uLgyX4vI0jzQPZHjO5-rT9XekiulOpRN-M02iODA"}`, // Replace with your actual access token
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (!data || !data.editions || !Array.isArray(data.editions)) {
    throw new Error("Invalid or missing data structure from the server.");
  }

  const transformedData = data.editions.map((item) => ({
    id: item.id,
    title: item.title,
    publisher: item.publishers ? item.publishers[0] : "",
    // isbn_13: item.isbn_13 || item.isbn_11,
    coverUrl:
      item.isbn_13 && item.isbn_13 > 0
        ? EditionEndpoints.FETCH_COVER_OL(undefined, item.isbn_13)
        : null,
    author: item.author ? item.author : "",
    usersOwning: item.users_owning,
  }));

  return transformedData;
};
export const fetchBooksByISBN = async (isbn: string) => {
  const response = await fetch(EditionEndpoints.FETCH_EDITION_BY_ISBN(isbn), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6ImQxNjg5NDE1ZWMyM2EzMzdlMmJiYWE1ZTNlNjhiNjZkYzk5MzY4ODQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9vay1zd2FwLTJkOWE1IiwiYXVkIjoiYm9vay1zd2FwLTJkOWE1IiwiYXV0aF90aW1lIjoxNzA0NjMzMDU0LCJ1c2VyX2lkIjoiVUxSRkp3WVZLdlNCR2V1RDZKWmcwRTRrOEJGMiIsInN1YiI6IlVMUkZKd1lWS3ZTQkdldUQ2SlpnMEU0azhCRjIiLCJpYXQiOjE3MDQ2MzMwNTQsImV4cCI6MTcwNDYzNjY1NCwicGhvbmVfbnVtYmVyIjoiKzE1NTU2NjYxMjM0IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMTU1NTY2NjEyMzQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.AwcM4gpbryzgZTKAlc-VvGwAWWoW2Qiqhn3RrhiNp7ShRQ8T9QxnS6ZdyRUhInkz6yOhTf-BPZ2SlMlTvfENpgjUnOda4P6OWVwXpObbkS2RFQ2zQp00o_7-pCYQ6PgbbDH1pApd6F0ujk_yChhw4QSCuv7eQ6hD7zWW7akaR5aM6e_UO1RcMNXN_jrmE3cBtBOsf0ci-Emf9YbYBcyQa4OWTExelhHn2p11KjrML4KZytiHU17Q9VUzDCxPwLu5P4uMJwpXM9J_kMhvPxBJXXWAZl9cCGDCslXYVdWWiWqwx8uLgyX4vI0jzQPZHjO5-rT9XekiulOpRN-M02iODA"}`, // Replace with your actual access token
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (!data || !data.editions || !Array.isArray(data.editions)) {
    throw new Error("Invalid or missing data structure from the server.");
  }
  return createBookData(data.editions);
};
export const sendOffer = async (userId, proposal) => {
  const offeredEditionIds = Array.isArray(proposal.offeredBook)
    ? proposal.offeredBook.map((book) => book.id)
    : [proposal.offeredBook.id];
  const requestedEditionIds = Array.isArray(proposal.requestedBook)
    ? proposal.requestedBook.map((book) => book.id)
    : [proposal.requestedBook.id];

  const response = await fetch(ProfileEndpoints.SENT_OFFER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzMmNjMWNiMjg5ZGQ0NjI2YTQzNWQ3Mjk4OWFlNDMyMTJkZWZlNzgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9vay1zd2FwLTJkOWE1IiwiYXVkIjoiYm9vay1zd2FwLTJkOWE1IiwiYXV0aF90aW1lIjoxNzAzMjQ4MjUwLCJ1c2VyX2lkIjoiMnZXNFJhRUpCc1RCYVI0VTloTHpudUtsTzZJMiIsInN1YiI6IjJ2VzRSYUVKQnNUQmFSNFU5aEx6bnVLbE82STIiLCJpYXQiOjE3MDM0MjU0MzMsImV4cCI6MTcwMzQyOTAzMywicGhvbmVfbnVtYmVyIjoiKzE1NTU2NjYxMjM0IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMTU1NTY2NjEyMzQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.p4gFmzGQKYv22zrsbo-zatwMeTs8WhbrFn6FFTkLY76PsfF2flZyEQ3hLFfDU3zy0BmS8SFgLyA6DQVp4uDGebtYNfxdCkHc6AB1Ni0fAF7FXoI_J3jQ8dUDA2cUQ9wQOzjaVcboiciX89Begp_GtM19EcOoK045Q1DIw-cWta0NGY-BjngJ11jWEYDJb1pzexsjTZiA6CuQghhq8sTZsvstwueCdhre4gwQzARJaXVzEQMfHWMekUacGqjkDa90onwNChlMzQtxdOu0KDrpgsZj7-8Oi5EQODnFl6xHp5g42vB64HNS2Kc2_frgQA1yxyxNeYaKVMB1ia6y_QmuOw"}`,
    },
    body: JSON.stringify({
      user_id: userId,
      receiver_id: proposal.receiverId,
      offered_editions: offeredEditionIds,
      requested_editions: requestedEditionIds,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to sent offer [sendOffer]");
  }
  return;
};
