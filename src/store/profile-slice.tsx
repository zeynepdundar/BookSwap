import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LIBRARY, WISHLIST } from "../constants";
import {
  acceptOfferAsync,
  addBookToListAsync,
  fetchReceivedOffersAsync,
  fetchSentOffersAsync,
  fetchTradeHistoryAsync,
  fetchUserProfileAsync,
  rejectOfferAsync,
  removeBookFromListAsync,
  sendOfferAsync,
  takeBackOfferAsync,
  updateProfileAsync,
} from "./profile-actions";
import { ProfileState, UserData } from "../models/User";

const initialState: ProfileState = {
  loading: false,
  error: null as { name: string; message: string } | null,
  profile: {
    id: "",
    username: "",
    name: "",
    birthdate: "",
    profilePicture: null,
    gender: "",
    languagePreference: "",
    wishedBooks: [],
    ownedBooks: [],
    receivedOffers: [],
    sentOffers: [],
    tradeHistory: [],
  } as UserData,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData: (state, action: PayloadAction<Partial<UserData>>) => {
      if (action.payload) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    setProfileImage: (state, action: PayloadAction<string | null>) => {
      state.profile.profilePicture = action.payload;
    },
    setLanguagePreference: (state, action: PayloadAction<string>) => {
      state.profile.languagePreference = action.payload; // Assuming 'image' is the key for profile image
    },
    clearProfileData: () => initialState,
    removeBookFromList: (
      state,
      action: PayloadAction<{ listType: string; id: string }>
    ) => {
      const { listType, id } = action.payload;
      const list = listType === WISHLIST ? "wishedBooks" : "ownedBooks";
      state.profile[list] = state.profile[list].filter(
        (book) => book.id !== id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBookToListAsync.fulfilled, (state, action) => {
        const booksToAdd = Array.isArray(action.payload.book)
          ? action.payload.book
          : [action.payload.book];

        if (action.payload.listType === WISHLIST) {
          state.profile.wishedBooks.unshift(...booksToAdd);
        }

        if (action.payload.listType === LIBRARY) {
          state.profile.ownedBooks.unshift(...booksToAdd);
        }
      })

      .addCase(removeBookFromListAsync.fulfilled, (state, action: any) => {
        if (action.payload.listType === WISHLIST) {
          state.profile.wishedBooks = state.profile.wishedBooks.filter(
            (book) => book.id !== action.payload.id
          );
        }
        if (action.payload.listType === LIBRARY) {
          state.profile.ownedBooks = state.profile.ownedBooks.filter(
            (book) => book.id !== action.payload.id
          );
        }
      })
      .addCase(sendOfferAsync.fulfilled, (state, action) => {
        state.profile.sentOffers = action.payload;
      })
      .addCase(acceptOfferAsync.fulfilled, (state, action) => {
        state.profile.receivedOffers = state.profile.receivedOffers.filter(
          (offer) => offer.id !== action.payload.id
        );
      })
      .addCase(rejectOfferAsync.fulfilled, (state, action) => {
        state.profile.receivedOffers = state.profile.receivedOffers.filter(
          (offer) => offer.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(rejectOfferAsync.pending, (state, action) => {
        state.profile.receivedOffers = state.profile.receivedOffers.filter(
          (offer) => offer.id !== action.payload
        );
        state.loading = true;
      })
      .addCase(takeBackOfferAsync.fulfilled, (state, action) => {
        state.profile.sentOffers = state.profile.sentOffers.filter(
          (offer) => offer.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(takeBackOfferAsync.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfileAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfileAsync.fulfilled, (state, action: any) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(updateProfileAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileAsync.fulfilled, (state, action: any) => {
        state.loading = false;
        state.profile = {
          ...state.profile,
          ...action.payload,
        };
        state.error = null;
      })
      .addCase(updateProfileAsync.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload;
      })
      .addCase(fetchReceivedOffersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReceivedOffersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.profile.receivedOffers = action.payload;
      })
      .addCase(fetchReceivedOffersAsync.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload;
      })
      .addCase(fetchSentOffersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSentOffersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.profile.sentOffers = action.payload;
      })
      .addCase(fetchSentOffersAsync.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload;
      })
      .addCase(fetchTradeHistoryAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTradeHistoryAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.profile.tradeHistory = action.payload;
      })
      .addCase(fetchTradeHistoryAsync.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload;
      })
      .addCase(fetchUserProfileAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as {
          name: string;
          message: string;
        } | null;
        state.profile = null;
      });
  },
});

export const {
  setProfileData,
  setLanguagePreference,
  clearProfileData,
  removeBookFromList,
} = profileSlice.actions;

export default profileSlice.reducer;
