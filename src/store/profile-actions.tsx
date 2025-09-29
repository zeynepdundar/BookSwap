import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./types";
import {
  addBookToList,
  fetchHistory,
  fetchReceivedOffer,
  fetchSentOffer,
  fetchUserProfileData,
  removeBookFromList,
  sendOffer,
  updateUserProfileData,
} from "../api/service";
import { ProfileEndpoints, TradeEndpoints } from "../api/endpoints";

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

export const updateProfileAsync = createAsyncThunk(
  'profile/updateProfile',
  async ({ profileData, fullUpdate = false }: { profileData: any; fullUpdate?: boolean }, { rejectWithValue }) => {
    try {
      await updateUserProfileData(profileData, fullUpdate);
      return profileData; 
    } catch (error) {
      console.error("Profile update failed:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const addBookToListAsync = createAsyncThunk(
  "profile/addBookToList",
  async (book: any, { getState }) => {
    try {
      const userId = (getState() as RootState).profile.profile.id;
      const response = await addBookToList(userId, book);
      const bookType = Array.isArray(book) ? book[0].type : book.type;

      if (response.status === "error") {
        return response; // Return the error response
      }
      return { book: response, listType: bookType };
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
      const allSentOffers = await fetchSentOffer(userId);
      return allSentOffers;
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

      const response = await fetch(TradeEndpoints.ACCEPT_OFFER, {
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

      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.message }; // Return the error response {"message": "Offer not found or not eligible for acceptance"}
      }
      return {
        success: true,
        id: offerId,
        conversationId: data.conversation_Id,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const rejectOfferAsync = createAsyncThunk(
  "profile/rejectOffer",
  async (offerId: any, { getState }) => {
    try {
      const id = (getState() as RootState).profile.profile.id;

      const response = await fetch(TradeEndpoints.REJECT_OFFER, {
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

      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.message }; // Return the error response {"message": "Offer not found or not eligible for acceptance"}
      }
      return offerId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const takeBackOfferAsync = createAsyncThunk(
  "profile/takeBackOffer",
  async (offerId: any, { getState }) => {
    try {
      const id = (getState() as RootState).profile.profile.id;

      const response = await fetch(TradeEndpoints.TAKE_BACK_OFFER, {
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

      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.message }; // Return the error response {"message": "Offer not found or not eligible for acceptance"}
      }
      return offerId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const fetchReceivedOffersAsync = createAsyncThunk(
  "profile/fetchReceivedOffers",
  async (userId, { rejectWithValue }) => {
    try {
      const offers = await fetchReceivedOffer(userId);
      return offers;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSentOffersAsync = createAsyncThunk(
  "profile/fetchSentOffers",
  async (userId, { rejectWithValue }) => {
    try {
      const offers = await fetchSentOffer(userId);
      return offers;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTradeHistoryAsync = createAsyncThunk(
  "profile/fetchTradeHistory",
  async (userId, { rejectWithValue }) => {
    try {
      const offers = await fetchHistory(userId);
      return offers;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
