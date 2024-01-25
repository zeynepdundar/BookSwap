import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./types";
import {
  fetchReceivedOffer,
  fetchUserProfileData,
  updateUserProfileData,
} from "../apiService";

export const fetchUserProfileAsync = createAsyncThunk(
  "profile/fetchUserProfile",
  async (firebaseUserId: string, { rejectWithValue }) => {
    try {
      const profile = await fetchUserProfileData(firebaseUserId);
      return profile;
    } catch (error) {
      console.error("Failed to fetch user profile [fetchUserProfileAsync]:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const addBookToWishlistAsync = createAsyncThunk(
  "profile/addBookToWishlist",
  async (book: any, { getState }) => {
    try {
      // Assuming your API method to add a book to the wishlist returns data about the updated profile
      const userId = (getState() as RootState).auth.user.id;

      // const response = await fetch(
      //   `${API_ENDPOINT}/user/${"1"}/wished_editions`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzMmNjMWNiMjg5ZGQ0NjI2YTQzNWQ3Mjk4OWFlNDMyMTJkZWZlNzgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9vay1zd2FwLTJkOWE1IiwiYXVkIjoiYm9vay1zd2FwLTJkOWE1IiwiYXV0aF90aW1lIjoxNzAzMjQ4MjUwLCJ1c2VyX2lkIjoiMnZXNFJhRUpCc1RCYVI0VTloTHpudUtsTzZJMiIsInN1YiI6IjJ2VzRSYUVKQnNUQmFSNFU5aEx6bnVLbE82STIiLCJpYXQiOjE3MDM0MjU0MzMsImV4cCI6MTcwMzQyOTAzMywicGhvbmVfbnVtYmVyIjoiKzE1NTU2NjYxMjM0IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMTU1NTY2NjEyMzQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.p4gFmzGQKYv22zrsbo-zatwMeTs8WhbrFn6FFTkLY76PsfF2flZyEQ3hLFfDU3zy0BmS8SFgLyA6DQVp4uDGebtYNfxdCkHc6AB1Ni0fAF7FXoI_J3jQ8dUDA2cUQ9wQOzjaVcboiciX89Begp_GtM19EcOoK045Q1DIw-cWta0NGY-BjngJ11jWEYDJb1pzexsjTZiA6CuQghhq8sTZsvstwueCdhre4gwQzARJaXVzEQMfHWMekUacGqjkDa90onwNChlMzQtxdOu0KDrpgsZj7-8Oi5EQODnFl6xHp5g42vB64HNS2Kc2_frgQA1yxyxNeYaKVMB1ia6y_QmuOw"}`,
      //     },
      //     body: JSON.stringify({
      //       edition_ids: [book.id],
      //     }),
      //   }
      // );

      // if (!response.ok) {
      //   throw new Error("Failed to add book with id", book.id);
      // }

      // console.log("res", response, book);

      // return book;

      // const data = await response.json(); // Assuming the server returns JSON

      // console.log(
      //   "HERE",
      //   data,
      //   userId,
      //   JSON.stringify({
      //     edition_ids: [bookId],
      //   })
      // );
      // return data; // Adjust based on your API response structure
    } catch (error) {
      console.log("Failed to add book with id", error);
      throw error;
    }
  }
);
export const addBookToLibraryAsync = createAsyncThunk(
  "profile/addBookToLibrary",
  async (book: any, { getState }) => {
    try {
      // Assuming your API method to add a book to the wishlist returns data about the updated profile
      const userId = (getState() as RootState).auth.user.id;
      console.log("HERE", userId)

      // const response = await fetch(
      //   `${API_ENDPOINT}/user/${"1"}/owned_editions`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzMmNjMWNiMjg5ZGQ0NjI2YTQzNWQ3Mjk4OWFlNDMyMTJkZWZlNzgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9vay1zd2FwLTJkOWE1IiwiYXVkIjoiYm9vay1zd2FwLTJkOWE1IiwiYXV0aF90aW1lIjoxNzAzMjQ4MjUwLCJ1c2VyX2lkIjoiMnZXNFJhRUpCc1RCYVI0VTloTHpudUtsTzZJMiIsInN1YiI6IjJ2VzRSYUVKQnNUQmFSNFU5aEx6bnVLbE82STIiLCJpYXQiOjE3MDM0MjU0MzMsImV4cCI6MTcwMzQyOTAzMywicGhvbmVfbnVtYmVyIjoiKzE1NTU2NjYxMjM0IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMTU1NTY2NjEyMzQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.p4gFmzGQKYv22zrsbo-zatwMeTs8WhbrFn6FFTkLY76PsfF2flZyEQ3hLFfDU3zy0BmS8SFgLyA6DQVp4uDGebtYNfxdCkHc6AB1Ni0fAF7FXoI_J3jQ8dUDA2cUQ9wQOzjaVcboiciX89Begp_GtM19EcOoK045Q1DIw-cWta0NGY-BjngJ11jWEYDJb1pzexsjTZiA6CuQghhq8sTZsvstwueCdhre4gwQzARJaXVzEQMfHWMekUacGqjkDa90onwNChlMzQtxdOu0KDrpgsZj7-8Oi5EQODnFl6xHp5g42vB64HNS2Kc2_frgQA1yxyxNeYaKVMB1ia6y_QmuOw"}`,
      //     },
      //     body: JSON.stringify({
      //       edition_ids: [book.id],
      //     }),
      //   }
      // );

      // if (!response.ok) {
      //   throw new Error("Failed to add book with id", book.id);
      // }

      // console.log("res", response, book);

      return book;
    } catch (error) {
      console.log("Failed to add book with id", error);
      throw error;
    }
  }
);
export const removeBookFromLibraryAsync = createAsyncThunk(
  "profile/removeBookFromLibrary",
  async (bookId: any, { getState }) => {
    try {
      // Assuming your API method to add a book to the wishlist returns data about the updated profile
      const userId = (getState() as RootState).auth.user.id;

      // const response = await fetch(
      //   `${API_ENDPOINT}/user/${"1"}/owned_editions`,
      //   {
      //     method: "DELETE",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzMmNjMWNiMjg5ZGQ0NjI2YTQzNWQ3Mjk4OWFlNDMyMTJkZWZlNzgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9vay1zd2FwLTJkOWE1IiwiYXVkIjoiYm9vay1zd2FwLTJkOWE1IiwiYXV0aF90aW1lIjoxNzAzMjQ4MjUwLCJ1c2VyX2lkIjoiMnZXNFJhRUpCc1RCYVI0VTloTHpudUtsTzZJMiIsInN1YiI6IjJ2VzRSYUVKQnNUQmFSNFU5aEx6bnVLbE82STIiLCJpYXQiOjE3MDM0MjU0MzMsImV4cCI6MTcwMzQyOTAzMywicGhvbmVfbnVtYmVyIjoiKzE1NTU2NjYxMjM0IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMTU1NTY2NjEyMzQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.p4gFmzGQKYv22zrsbo-zatwMeTs8WhbrFn6FFTkLY76PsfF2flZyEQ3hLFfDU3zy0BmS8SFgLyA6DQVp4uDGebtYNfxdCkHc6AB1Ni0fAF7FXoI_J3jQ8dUDA2cUQ9wQOzjaVcboiciX89Begp_GtM19EcOoK045Q1DIw-cWta0NGY-BjngJ11jWEYDJb1pzexsjTZiA6CuQghhq8sTZsvstwueCdhre4gwQzARJaXVzEQMfHWMekUacGqjkDa90onwNChlMzQtxdOu0KDrpgsZj7-8Oi5EQODnFl6xHp5g42vB64HNS2Kc2_frgQA1yxyxNeYaKVMB1ia6y_QmuOw"}`,
      //     },
      //     body: JSON.stringify({
      //       edition_ids: [bookId],
      //     }),
      //   }
      // );

      // if (!response.ok) {
      //   throw new Error("Failed to remove book with id", bookId);
      // }

      // console.log("res", response, bookId);

      return bookId;
    } catch (error) {
      console.log("Failed to remove book with id",bookId );
      throw error;
    }
  }
);
export const removeBookFromWishlistAsync = createAsyncThunk(
  "profile/removeBookFromWishlist",
  async (bookId: any, { getState }) => {
    try {
      // Assuming your API method to add a book to the wishlist returns data about the updated profile
      const userId = (getState() as RootState).auth.user.id;

      // const response = await fetch(
      //   `${API_ENDPOINT}/user/${"1"}/wished_editions`,
      //   {
      //     method: "DELETE",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzMmNjMWNiMjg5ZGQ0NjI2YTQzNWQ3Mjk4OWFlNDMyMTJkZWZlNzgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9vay1zd2FwLTJkOWE1IiwiYXVkIjoiYm9vay1zd2FwLTJkOWE1IiwiYXV0aF90aW1lIjoxNzAzMjQ4MjUwLCJ1c2VyX2lkIjoiMnZXNFJhRUpCc1RCYVI0VTloTHpudUtsTzZJMiIsInN1YiI6IjJ2VzRSYUVKQnNUQmFSNFU5aEx6bnVLbE82STIiLCJpYXQiOjE3MDM0MjU0MzMsImV4cCI6MTcwMzQyOTAzMywicGhvbmVfbnVtYmVyIjoiKzE1NTU2NjYxMjM0IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrMTU1NTY2NjEyMzQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.p4gFmzGQKYv22zrsbo-zatwMeTs8WhbrFn6FFTkLY76PsfF2flZyEQ3hLFfDU3zy0BmS8SFgLyA6DQVp4uDGebtYNfxdCkHc6AB1Ni0fAF7FXoI_J3jQ8dUDA2cUQ9wQOzjaVcboiciX89Begp_GtM19EcOoK045Q1DIw-cWta0NGY-BjngJ11jWEYDJb1pzexsjTZiA6CuQghhq8sTZsvstwueCdhre4gwQzARJaXVzEQMfHWMekUacGqjkDa90onwNChlMzQtxdOu0KDrpgsZj7-8Oi5EQODnFl6xHp5g42vB64HNS2Kc2_frgQA1yxyxNeYaKVMB1ia6y_QmuOw"}`,
      //     },
      //     body: JSON.stringify({
      //       edition_ids: [bookId],
      //     }),
      //   }
      // );

      // if (!response.ok) {
      //   throw new Error("Failed to remove book with id", bookId);
      // }

      // console.log("res", response, bookId);

      return bookId;
    } catch (error) {
      console.log("Failed to remove book with id", error);
      throw error;
    }
  }
);

export const fetchReceivedOfferAsync = createAsyncThunk(
  "profile/fetchReceivedOfferAsync",
  async (userId: string, { dispatch }) => {
    try {
      const receivedOffer = await fetchReceivedOffer(userId);

      // console.log("Fetching user profile", firebaseUserId, profile);

      // dispatch(setProfileData(profile));

      return receivedOffer;
    } catch (error) {
      console.error("Failed to fetch user profile [fetchReceivedOfferAsync]:", error);
      throw error;
    }
  }
);
