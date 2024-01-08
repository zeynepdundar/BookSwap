import { createSlice, current } from "@reduxjs/toolkit";
import { updateUserProfileAsync } from "./profile-actions";

const initialState = {
  loading: false,
  error: null,
  profile: {
    id:null,
    name: "",
    birthdate: "",
    gender: "",
    languagePreference: "",
    wishlistBookIds: [],
    libraryBookIds: [],
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
    clearProfileData: (state) => {
      state.profile = {
        id:null,
        name: "",
        birthdate: "",
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
      });
  },
});

export const { setProfileData, addBookToList, removeBookFromList } =
  profileSlice.actions;

export default profileSlice.reducer;
