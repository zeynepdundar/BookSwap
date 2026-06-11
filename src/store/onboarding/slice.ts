import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OnboardingState } from "./types";
import { AddBooksPayload, Book, BookCollections } from "@/types/book.types";
import { completeOnboardingAsync } from "./thunks";

const initialState: OnboardingState = {
  name: "",
  birthdate: null,
  imageData: null,
  gender: "",
  languagePreference: "",

  wishlistBooks: [],
  libraryBooks: [],

  loading: false,
  error: null,
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setOnboardingName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },

    setOnboardingBirthdate: (state, action: PayloadAction<string>) => {
      state.birthdate = action.payload;
    },

    setOnboardingImage: (state, action: PayloadAction<string>) => {
      state.imageData = action.payload;
      console.log("Onboarding image updated:", state.imageData);
    },

    setOnboardingGender: (state, action: PayloadAction<"m" | "f">) => {
      state.gender = action.payload;
    },

    setOnboardingLanguage: (state, action: PayloadAction<string>) => {
      state.languagePreference = action.payload;
    },

    setOnboardingWishlist: (state, action: PayloadAction<Book[]>) => {
      state.wishlistBooks = action.payload;
    },

    setOnboardingLibrary: (state, action: PayloadAction<Book[]>) => {
      state.libraryBooks = action.payload;
    },

    addBooksToOnboarding: (
      state,
      action: PayloadAction<AddBooksPayload  >
    ) => {
      const { collection, books } = action.payload;

      const target =
        collection === BookCollections.WISHLIST
          ? state.wishlistBooks
          : state.libraryBooks;

      const existingIds = new Set(target.map((book) => book.id));

      const newBooks = books.filter(
        (book) => !existingIds.has(book.id)
      );

      target.push(...newBooks);
    },

    removeFromOnboardingWishlist: (state, action: PayloadAction<string>) => {
      state.wishlistBooks = state.wishlistBooks.filter(
        (book) => book.id !== action.payload
      );
    },
    removeFromOnboardingLibrary: (state, action: PayloadAction<string>) => {
      state.libraryBooks = state.libraryBooks.filter(
        (book) => book.id !== action.payload
      );
    },

    resetOnboarding: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(completeOnboardingAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeOnboardingAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(completeOnboardingAsync.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Failed to complete onboarding";
      });
  }
});

export const {
  setOnboardingName,
  setOnboardingBirthdate,
  setOnboardingGender,
  setOnboardingLanguage,
  setOnboardingImage,
  resetOnboarding,
  addBooksToOnboarding,
  removeFromOnboardingWishlist,
  removeFromOnboardingLibrary,
} = onboardingSlice.actions;

export const onboardingReducer = onboardingSlice.reducer;