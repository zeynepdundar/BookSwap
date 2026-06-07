import { fetchUserProfileData, updateUserProfileData } from "@/services/profile/profile.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types";


export const fetchUserProfileAsync = createAsyncThunk(
  "profile/fetchUser",
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

export const updateProfileAsync = createAsyncThunk(
  "profile/update",
  async (profileData: any, { getState }) => {
    const state = getState() as RootState;

    const wishlistBookIds = state.books.wishlistIds;
    const libraryBookIds = state.books.libraryIds;
    console.log("Updating profile with data:", profileData, "Wishlist IDs:", wishlistBookIds, "Library IDs:", libraryBookIds);

    const payload = {
      ...profileData,
      wishlistBookIds,
      libraryBookIds,
    };

    await updateUserProfileData(payload);

    return profileData;
  }
);


