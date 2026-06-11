import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types";
import { updateUserProfileData } from "@/services/profile/profile.service";

export const completeOnboardingAsync = createAsyncThunk(
  "onboarding/complete",
  async (_, { getState }) => {
    const state = getState() as RootState;

    const onboarding = state.onboarding;
    const userId = state.profile.profile.id;    

    return await updateUserProfileData({
      id: userId,
      name: onboarding.name,
      gender: onboarding.gender,
      birthdate: onboarding.birthdate,
      imageData: onboarding.imageData,
      languagePreference: onboarding.languagePreference,
      wishlistBookIds: onboarding.wishlistBooks.map(b => b.id),
      libraryBookIds: onboarding.libraryBooks.map(b => b.id),
    });;
  }
);