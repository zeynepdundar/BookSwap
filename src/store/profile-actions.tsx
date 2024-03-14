import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./types";
import {
  addBookToList,
  fetchSentOffer,
  fetchUserProfileData,
  removeBookFromList,
  sendOffer,
} from "../api/service";
import { ProfileEndpoints } from "../api/endpoints";
import { structureOfferData } from "../utils/helper";

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
      const userId = (getState() as RootState).profile.profile.id;
      const addedBook = await addBookToList(userId, book);
      const bookType = Array.isArray(book) ? book[0].type : book.type;

      return { book: addedBook, listType: bookType };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const removeBookFromListAsync = createAsyncThunk(
  "profile/removeBookFromList",
  async (book: any, { getState }) => {
    try {
      const userId = (getState() as RootState).profile.profile.id;
      await removeBookFromList(userId, book);
      return { id: book.id, listType: book.type };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const sendOfferAsync = createAsyncThunk(
  "profile/sendOffer",
  async (createdOffer: any, { getState }) => {
    try {
      const userId = (getState() as RootState).profile.profile.id;
      await sendOffer(userId, createdOffer);
      const allSentOffers= await fetchSentOffer(userId);
      return allSentOffers
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const acceptOfferAsync = createAsyncThunk(
  "profile/acceptOffer",
  async (offerId: any, { getState }) => {
    try {
      const uid = (getState() as RootState).auth.user.firebaseUserId;
      const id = (getState() as RootState).profile.profile.id;


      const response = await fetch(ProfileEndpoints.ACCEPT_OFFER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${"your_access_token"}`, // Replace with your actual access token
        },
        body: JSON.stringify({
          user_id: id,
          firebase_uid: uid,
          offer_id: offerId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to accept offer");
      }
      console.log("The offer was successfully accepted, offerId: ", offerId);
      return offerId
    } catch (error) {
      console.error(error);
    }
  }
);

export const rejectOfferAsync = createAsyncThunk(
  "profile/rejectOffer",
  async (offerId: any, { getState }) => {
    try {
      const id = (getState() as RootState).profile.profile.id;

      const response = await fetch(ProfileEndpoints.REJECT_OFFER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${"your_access_token"}`, // Replace with your actual access token
        },
        body: JSON.stringify({
          user_id: id,
          offer_id: offerId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to reject offer");
      }
      return offerId
    } catch (error) {
      console.error(error);
    }
  }
);

export const takeBackOfferAsync = createAsyncThunk(
  "profile/takeBackOffer",
  async (offerId: any, { getState }) => {
    try {
      const id = (getState() as RootState).profile.profile.id;

      const response = await fetch(ProfileEndpoints.TAKE_BACK_OFFER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${"your_access_token"}`, // Replace with your actual access token
        },
        body: JSON.stringify({
          user_id: id,
          offer_id: offerId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to take back offer");
      }
      console.log("The offer was successfully taken back, offerId: ", offerId);
      return offerId
    } catch (error) {
      console.error(error);
    }
  }
);
// export const fetchReceivedOfferAsync = createAsyncThunk(
//   "profile/fetchReceivedOfferAsync",
//   async (userId: string, { dispatch }) => {
//     try {
//       const receivedOffers = await fetchReceivedOffer(userId);
//       console.log("Fetching user profile", receivedOffers);
//       // dispatch(setProfileData(profile));
//       return receivedOffer;
//     } catch (error) {
//       console.error(
//         "Failed to fetch user profile [fetchReceivedOfferAsync]:",
//         error
//       );
//       throw error;
//     }
//   }
// );
