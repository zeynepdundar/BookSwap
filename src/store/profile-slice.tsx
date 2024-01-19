import { createSlice, current } from "@reduxjs/toolkit";
import {
  addBookToLibraryAsync,
  addBookToWishlistAsync,
  removeBookFromLibraryAsync,
  removeBookFromWishlistAsync,
  updateUserProfileAsync,
} from "./profile-actions";

const initialState = {
  loading: false,
  error: null,
  profile: {
    id: null,
    name: "Zeynep Dündar",
    birthdate: "",
    imageData: null,
    gender: "",
    languagePreference: "tr",
    wishlistBook: [],
    libraryBook: [],
    pushToken: "",
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
        pushToken: "",
      };
    },
    setPushToken: (state, action) => {
      state.profile.pushToken = action.payload;
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
      .addCase(updateUserProfileAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfileAsync.fulfilled, (state, action) => {
        state.loading = false;
        // state.userData = action.payload;
      })
      .addCase(updateUserProfileAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      .addCase(addBookToWishlistAsync.fulfilled, (state, action) => {
        state.profile.wishlistBook.push({ ...action.payload });
      })

      .addCase(addBookToLibraryAsync.fulfilled, (state, action) => {
        state.profile.libraryBook.push({ ...action.payload });
        console.log("addBookToLibraryAsync:", current(state.profile));
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

  },
});

export const {
  setProfileData,
  setLanguagePreference,
  setPushToken,
  clearProfileData,
  removeBookFromList,
} = profileSlice.actions;

export default profileSlice.reducer;
