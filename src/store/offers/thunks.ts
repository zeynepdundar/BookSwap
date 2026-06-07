import { OfferEndpoints } from "@/api/offers.endpoints";
import { fetchHistory, fetchReceivedOffer, fetchSentOffer, sendOffer } from "@/services/offers/offers.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types";

export const sendOfferAsync = createAsyncThunk(
  "offers/sendOffer",
  async (createdOffer: any, { getState }) => {
    try {
      const userId = (getState() as any).profile.profile.id;
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
  "offers/acceptOffer",
  async (offerId: any, { getState }) => {
    try {
      const uid = (getState() as any).auth.user.firebaseUserId;
      const id = (getState() as any).profile.profile.id;
      const response = await fetch(OfferEndpoints.ACCEPT, {
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
  "offers/rejectOffer",
  async (offerId: any, { getState }) => {
    try {
      const id = (getState() as any).profile.profile.id;

      const response = await fetch(OfferEndpoints.REJECT, {
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
  "offers/takeBackOffer",
  async (offerId: any, { getState }) => {
    try {
      const id = (getState() as any).profile.profile.id;

      const response = await fetch(OfferEndpoints.TAKEBACK, {
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

export const fetchReceivedOffersAsyncjj = createAsyncThunk(
  "offers/fetchReceivedOffers",
  async (_, { rejectWithValue }) => {
    try {
      const offers = await fetchReceivedOffer("2");
      return offers;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchReceivedOffersAsync = createAsyncThunk(
  "offers/fetchReceivedOffers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState; 
      const userId = state.profile.profile?.id;

      if (!userId) {
        return rejectWithValue("Active user session not found");
      }

      // Pass the extracted ID directly to your service function
      const offers = await fetchReceivedOffer(userId);
      return offers;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch offers");
    }
  }
);

export const fetchSentOffersAsync = createAsyncThunk(
  "offers/fetchSentOffers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState; 
      const userId = state.profile.profile?.id;

      if (!userId) {
        return rejectWithValue("Active user session not found");
      }
      const offers = await fetchSentOffer(userId);
      return offers;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTradeHistoryAsync = createAsyncThunk(
  "offers/fetchTradeHistory",
  async (userId: number, { rejectWithValue }) => {
    try {
      const offers = await fetchHistory(userId);
      return offers;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
