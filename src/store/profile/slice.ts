import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserProfileAsync,
  updateProfileAsync,
} from "./thunks";
import { ProfileState, UserProfile } from "./types";

const initialState: ProfileState = {
  loading: false,
  error: null as { name: string; message: string } | null,
  profile: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      if (action.payload && typeof action.payload === "object") {
        state.profile = { ...state.profile, ...action.payload };
      } else {
        console.error("Invalid payload:", action.payload);
      }
    },
    setProfileImage: (state, action) => {
      if (state.profile) state.profile.imageData = action.payload;
    },
    setLanguagePreference: (state, action) => {
      if (state.profile) state.profile.languagePreference = action.payload;
    },
    clearProfileData: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfileAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfileAsync.fulfilled, (state, action: any) => {
        const raw: UserProfile = action.payload;
        state.loading = false;
        state.error = null;
        state.profile = {
          id: raw.id,
          name: raw.name,
          birthdate: raw.birthdate,
          imageData: raw.imageData,
          gender: raw.gender as "m" | "f",
          languagePreference: raw.languagePreference,
        };
      })
      .addCase(fetchUserProfileAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as { name: string; message: string } | null;
        console.error("Failed to fetch user profile [extraReducers]:", action.payload);
        state.profile = initialState.profile;
      })

      .addCase(updateProfileAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileAsync.fulfilled, (state, action: any) => {
        state.loading = false;
        console.log("Profile updated successfully [extraReducers]:", action.payload, "Current state profile:", state.profile);
        state.profile = { ...state.profile, ...action.payload };
        state.error = null;
      })
      .addCase(updateProfileAsync.rejected, (state) => {
        state.loading = false;
      })


  },
});

export const {
  setProfileData,
  setProfileImage,
  setLanguagePreference,
  clearProfileData,
} = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
