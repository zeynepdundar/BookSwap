import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./types";

const EMPTY_IDS: number[] = [];

/* -------------------------------------------------------------------------- */
/*                                 ONBOARDING                                 */
/* -------------------------------------------------------------------------- */

export const selectOnboardingWishlistBooks = (state: RootState) =>
  state.onboarding.wishlistBooks;

export const selectOnboardingLibraryBooks = (state: RootState) =>
  state.onboarding.libraryBooks;

/* -------------------------------------------------------------------------- */
/*                                   BOOKS                                    */
/* -------------------------------------------------------------------------- */

export const selectWishlistBookIds = (state: RootState) =>
  state.books.wishlistIds ?? EMPTY_IDS;

export const selectLibraryBookIds = (state: RootState) =>
  state.books.libraryIds ?? EMPTY_IDS;

export const selectWishlistBooks = createSelector(
  [
    selectWishlistBookIds,
    (state: RootState) => state.books.entities,
  ],
  (wishlistIds, entities) =>
    wishlistIds.map((id) => entities[id]).filter(Boolean)
);

export const selectLibraryBooks = createSelector(
  [
    selectLibraryBookIds,
    (state: RootState) => state.books.entities,
  ],
  (libraryIds, entities) =>
    libraryIds.map((id) => entities[id]).filter(Boolean)
);

/* -------------------------------------------------------------------------- */
/*                                   OFFERS                                   */
/* -------------------------------------------------------------------------- */

