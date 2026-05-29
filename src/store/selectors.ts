import { createSelector } from "@reduxjs/toolkit";
import { Book } from "@/types/book.types";
import { TradeOffer } from "@/types/offer.types";
import { RootState } from "./types";
import { booksSelectors } from "./books";
import { offersSelectors } from "./offers";
import { historySelectors } from "./history";

const EMPTY_IDS: number[] = [];

/* -------------------------------------------------------------------------- */
/*                                   STATE                                    */
/* -------------------------------------------------------------------------- */

const selectBooksState = (state: RootState) => state.books;
const selectOffersState = (state: RootState) => state.offers;
const selectHistoryState = (state: RootState) => state.history;

/* -------------------------------------------------------------------------- */
/*                                   IDS                                      */
/* -------------------------------------------------------------------------- */

const selectWishlistBookIds = (state: RootState) =>
  state.profile.profile?.wishlistBookIds ?? EMPTY_IDS;

const selectLibraryBookIds = (state: RootState) =>
  state.profile.profile?.libraryBookIds ?? EMPTY_IDS;

const selectSentOfferIds = (state: RootState) =>
  state.profile.profile?.sentOfferIds ?? EMPTY_IDS;

const selectReceivedOfferIds = (state: RootState) =>
  state.profile.profile?.receivedOfferIds ?? EMPTY_IDS;

const selectHistoryIds = (state: RootState) =>
  state.profile.profile?.historyIds ?? EMPTY_IDS;

/* -------------------------------------------------------------------------- */
/*                               WISHLIST BOOKS                               */
/* -------------------------------------------------------------------------- */

export const selectWishlistBooks = createSelector(
  [selectWishlistBookIds, selectBooksState],
  (ids, booksState): Book[] =>
    ids
      .map((id) => booksSelectors.selectById(booksState, id))
      .filter((b): b is Book => b !== undefined)
);

/* -------------------------------------------------------------------------- */
/*                                LIBRARY BOOKS                               */
/* -------------------------------------------------------------------------- */

export const selectLibraryBooks = createSelector(
  [selectLibraryBookIds, selectBooksState],
  (ids, booksState): Book[] =>
    ids
      .map((id) => booksSelectors.selectById(booksState, id))
      .filter((b): b is Book => b !== undefined)
);

/* -------------------------------------------------------------------------- */
/*                                 SENT OFFERS                                */
/* -------------------------------------------------------------------------- */

export const selectSentOffers = createSelector(
  [selectSentOfferIds, selectOffersState],
  (ids, offersState): TradeOffer[] =>
    ids
      .map((id) => offersSelectors.selectById(offersState, id))
      .filter((o): o is TradeOffer => o !== undefined)
);

/* -------------------------------------------------------------------------- */
/*                              RECEIVED OFFERS                               */
/* -------------------------------------------------------------------------- */

export const selectReceivedOffers = createSelector(
  [selectReceivedOfferIds, selectOffersState],
  (ids, offersState): TradeOffer[] =>
    ids
      .map((id) => offersSelectors.selectById(offersState, id))
      .filter((o): o is TradeOffer => o !== undefined)
);

/* -------------------------------------------------------------------------- */
/*                                   HISTORY                                  */
/* -------------------------------------------------------------------------- */

export const selectHistoryItems = createSelector(
  [selectHistoryIds, selectHistoryState],
  (ids, historyState): TradeOffer[] =>
    ids
      .map((id) => historySelectors.selectById(historyState, id))
      .filter((h): h is TradeOffer => h !== undefined)
);