import { createSlice, current } from "@reduxjs/toolkit";
import {
  addBookToLibraryAsync,
  addBookToWishlistAsync,
  fetchReceivedOfferAsync,
  fetchUserProfileAsync,
  removeBookFromLibraryAsync,
  removeBookFromWishlistAsync,
} from "./profile-actions";

// const initialState = {
//   loading: false,
//   error: null,
//   profile: {
//     id: "47",
//     name: "Zeynep47",
//     birthdate: "",
//     imageData: null,
//     gender: "",
//     languagePreference: "tr",
//     wishlistBook: [],
//     libraryBook: [],
//     pushToken: "",

//     receivedOfferIds: [], // Add this line for received trade ids
//     sentOfferIds: [], // Add this line for sent trade ids
//   },
// };

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
  },
};

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
      console.log("profileSlice:", current(state));
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
      };
    },
    removeBookFromList: (state, action) => {
      initialState.profile.wishlistBook.filter((id) => id !== id);
      if (action.payload.listType === "wishlist")
        state.profile.wishlistBook.splice(
          state.profile.wishlistBook.indexOf(action.payload.id),
          1
        );
      if (action.payload.listType === "library")
        state.profile.libraryBook.splice(
          state.profile.libraryBook.indexOf(action.payload.id),
          1
        );
    },
  },
  extraReducers: (builder) => {
    builder
      //Add authenticated user to db
      .addCase(addBookToWishlistAsync.fulfilled, (state, action) => {
        state.profile.wishlistBook.push({ ...action.payload });
      })

      .addCase(addBookToLibraryAsync.fulfilled, (state, action) => {
        state.profile.libraryBook.push({ ...action.payload });
        // console.log("addBookToLibraryAsync:", current(state.profile));
      })

      .addCase(removeBookFromLibraryAsync.fulfilled, (state, action) => {
        state.profile.libraryBook.splice(
          state.profile.libraryBook.indexOf(action.payload),
          1
        );
      })
      .addCase(removeBookFromWishlistAsync.fulfilled, (state, action) => {
        state.profile.wishlistBook.splice(
          state.profile.wishlistBook.indexOf(action.payload),
          1
        );
      })

      .addCase(fetchReceivedOfferAsync.fulfilled, (state, action) => {
        state.profile.receivedOffer = action.payload;
        console.log("fetchReceivedOfferAsync:", current(state.profile));

      })
      .addCase(fetchUserProfileAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfileAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
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
