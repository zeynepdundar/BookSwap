import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./types";
import {
  addBookToList,
  fetchUserProfileData,
  removeBookFromList,
  transformBookData,
} from "../api/service";

export const fetchUserProfileAsync = createAsyncThunk(
  "profile/fetchUserProfile",
  async (firebaseUserId: string, { rejectWithValue }) => {
    try {
      const profile = await fetchUserProfileData(firebaseUserId);
      return profile;
    } catch (error) {
      console.error(
        "Failed to fetch user profile [fetchUserProfileAsync]:",
        error
      );
      return rejectWithValue(error.message);
    }
  }
);

// interface BookListArgs {
//   book: any; // Adjust the type of 'book' as needed
//   listType: string;
// }

export const addBookToListAsync = createAsyncThunk(
  "profile/addBookToList",
  async (book: any, { getState }) => {
    try {
      const userId = (getState() as RootState).auth.user.id;
      const addedBook = await addBookToList(userId, book);

      return { book: addedBook, listType: book.type };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const removeBookFromListAsync = createAsyncThunk(
  "profile/removeBookFromList",
  async (book:any, { getState }) => {
    try {
      const userId = (getState() as RootState).auth.user.id;
      await removeBookFromList(userId, book);
      return { id: book.id, listType: book.listType };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const fetchReceivedOfferAsync = createAsyncThunk(
  "profile/fetchReceivedOfferAsync",
  async (userId: string, { dispatch }) => {
    try {
      // const receivedOffer = await fetchReceivedOffer(userId);
      // console.log("Fetching user profile", firebaseUserId, profile);
      // dispatch(setProfileData(profile));
      // return receivedOffer;
    } catch (error) {
      console.error(
        "Failed to fetch user profile [fetchReceivedOfferAsync]:",
        error
      );
      throw error;
    }
  }
);
