import { createSlice, current } from "@reduxjs/toolkit";
import { updateUserProfileAsync, uploadProfileImageAsync } from "./profile-actions";

const initialState = {
  loading: false,
  error: null,
  profile: {
    id:null,
    name: "Zeynep Dündar",
    birthdate: "",
    imageData: null,
    gender: "",
    languagePreference: "tr",
    wishlistBookIds: [5,6,8],
    libraryBookIds: [99,2,56, 9],
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
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
        id:null,
        name: "",
        birthdate: "",
        imageData:null,
        gender: "",
        languagePreference: "",
        wishlistBookIds: [],
        libraryBookIds: [],
      };
    },
    addBookToList: (state, action) => {
      if (action.payload.listType === "wishlist")
        state.profile.wishlistBookIds.push(action.payload.id);
      if (action.payload.listType === "library")
        state.profile.libraryBookIds.push(action.payload.id);
    },
    removeBookFromList: (state, action) => {
      initialState.profile.wishlistBookIds.filter((id) => id !== id);
      if (action.payload.listType === "wishlist")
        state.profile.wishlistBookIds.splice(
          state.profile.wishlistBookIds.indexOf(action.payload.id),
          1
        );
      if (action.payload.listType === "library")
        state.profile.libraryBookIds.splice(
          state.profile.libraryBookIds.indexOf(action.payload.id),
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

      // .addCase(uploadProfileImageAsync.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      .addCase(uploadProfileImageAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.profile.imageData = action.payload;
        // Dispatch the action to set the profile image
        // Assuming action.payload contains the image data or URL
        // dispatch(setProfileImage(action.payload));
      })
      .addCase(uploadProfileImageAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { setProfileData,setLanguagePreference, addBookToList, removeBookFromList } =
  profileSlice.actions;

export default profileSlice.reducer;
