import { createSlice, current } from "@reduxjs/toolkit";
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
} from "./profile-actions";

export const ListTypes = {
  WISHLIST: "WISHLIST",
  LIBRARY: "LIBRARY",
};

export const WISHLIST = ListTypes.WISHLIST;
export const LIBRARY = ListTypes.LIBRARY;

export interface UserProfile {
  id: string;
  name: string;
  birthdate: string;
  imageData: string | null;
  gender: string;
  languagePreference: string;
  wishlistBook: any[];
  libraryBook: any[];
  receivedOffer?;
  sentOffer?;
  historyList?;
}
interface ProfileState {
  loading: boolean;
  error: null | Error;
  profile?: UserProfile;
}
const initialState: ProfileState = {
  loading: false,
  error: null as { name: string; message: string } | null,
  // profile: null as UserProfile | null,
  profile: {
    id: "",
    name: "",
    birthdate: "",
    imageData: null,
    gender: "",
    languagePreference: "",
    wishlistBook: [],
    libraryBook: [],

    receivedOffer: [], // Add this line for received trade ids
    sentOffer: [], // Add this line for sent trade ids
    historyList: [], // Add this line for history
  },
};

// const initialState: ProfileState = {
//   loading: false,
//   error: null as { name: string; message: string } | null,
//   // profile: null as UserProfile | null,
//   profile: {
//     id: "28",
//     name: "Zeynep28",
//     birthdate: "",
//     imageData: null,
//     gender: "f",
//     languagePreference: "en",
//     wishlistBook: [],
//     libraryBook: [],

//     receivedOffer: [], // Add this line for received trade ids
//     sentOffer: [], // Add this line for sent trade ids
//   },
// };

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      if (action.payload && typeof action.payload === "object") {
        // Check if action.payload is an object
        state.profile = { ...state.profile, ...action.payload };
      } else {
        // Handle other cases as needed
        console.error("Invalid payload:", action.payload);
      }
    },
    setProfileImage: (state, action) => {
      state.profile.imageData = action.payload; // Assuming 'image' is the key for profile image
    },
    setLanguagePreference: (state, action) => {
      state.profile.languagePreference = action.payload; // Assuming 'image' is the key for profile image
    },
    clearProfileData: (state) => {
      state.profile = {
        id: null,
        name: "",
        birthdate: "",
        imageData: null,
        gender: "",
        languagePreference: "",
        wishlistBook: [],
        libraryBook: [],
        receivedOffer: [],
        sentOffer: [],
        historyList: [],
      };
    },
    removeBookFromList: (state, action) => {
      if (action.payload.listType === WISHLIST)
        state.profile.wishlistBook.splice(
          state.profile.wishlistBook.indexOf(action.payload.id),
          1
        );
      if (action.payload.listType === LIBRARY)
        state.profile.libraryBook.splice(
          state.profile.libraryBook.indexOf(action.payload.id),
          1
        );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBookToListAsync.fulfilled, (state, action: any) => {
        const booksToAdd = Array.isArray(action.payload.book)
          ? action.payload.book
          : [action.payload.book];

        if (action.payload.listType === WISHLIST) {
          state.profile.wishlistBook.push(...booksToAdd);
        }

        if (action.payload.listType === LIBRARY) {
          state.profile.libraryBook.push(...booksToAdd);
        }
      })

      .addCase(removeBookFromListAsync.fulfilled, (state, action: any) => {
        if (action.payload.listType === WISHLIST) {
          state.profile.wishlistBook = state.profile.wishlistBook.filter(
            (book) => book.id !== action.payload.id
          );
        }
        if (action.payload.listType === LIBRARY) {
          state.profile.libraryBook = state.profile.libraryBook.filter(
            (book) => book.id !== action.payload.id
          );
        }
      })
      .addCase(sendOfferAsync.fulfilled, (state, action) => {
        state.profile.sentOffer = action.payload;
      })
      .addCase(acceptOfferAsync.fulfilled, (state, action) => {
        state.profile.receivedOffer = state.profile.receivedOffer.filter(
          (offer) => offer.id !== action.payload
        );
      })
      .addCase(rejectOfferAsync.fulfilled, (state, action) => {
        state.profile.receivedOffer = state.profile.receivedOffer.filter(
          (offer) => offer.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(rejectOfferAsync.pending, (state, action) => {
        state.profile.receivedOffer = state.profile.receivedOffer.filter(
          (offer) => offer.id !== action.payload
        );
        state.loading = true;
      })
      .addCase(takeBackOfferAsync.fulfilled, (state, action) => {
        state.profile.sentOffer = state.profile.sentOffer.filter(
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
      .addCase(fetchReceivedOffersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReceivedOffersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.profile.receivedOffer = action.payload;
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
        state.profile.sentOffer = action.payload;
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
        state.profile.historyList = action.payload;
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
