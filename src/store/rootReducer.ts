import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "@/store/auth";
import { profileReducer } from "@/store/profile";
import { booksReducer } from "@/store/books";
import { offersReducer } from "@/store/offers";
import { onboardingReducer } from "@/store/onboarding";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  books: booksReducer,
  offers: offersReducer,
  onboarding: onboardingReducer,
});

export default rootReducer;