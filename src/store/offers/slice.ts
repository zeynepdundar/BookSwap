import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";

import {
  acceptOfferAsync,
  fetchReceivedOffersAsync,
  fetchSentOffersAsync,
  fetchTradeHistoryAsync,
  rejectOfferAsync,
  sendOfferAsync,
  takeBackOfferAsync,
} from "./thunks";

import { Offer } from "./types";
import { RootState } from "../types";

/* -------------------------------------------------------------------------- */
/*                               ADAPTER FACTORY                              */
/* -------------------------------------------------------------------------- */

export const createOfferAdapter = () =>
  createEntityAdapter<Offer>({
    selectId: (offer) => offer.id,
  });

/* -------------------------------------------------------------------------- */
/*                                   STATE                                    */
/* -------------------------------------------------------------------------- */

interface OffersState {
  received: EntityState<Offer>;
  sent: EntityState<Offer>;
  history: EntityState<Offer>;

  loading: boolean;
  error: string | null;
}

const receivedAdapter = createOfferAdapter();
const sentAdapter = createOfferAdapter();
const historyAdapter = createOfferAdapter();

const initialState: OffersState = {
  received: receivedAdapter.getInitialState(),
  sent: sentAdapter.getInitialState(),
  history: historyAdapter.getInitialState(),

  loading: false,
  error: null,
};

/* -------------------------------------------------------------------------- */
/*                                 SELECTORS                                  */
/* -------------------------------------------------------------------------- */

export const offersSelectors = {
  received: receivedAdapter.getSelectors(
    (state: RootState) => state.offers.received
  ),
  sent: sentAdapter.getSelectors(
    (state: RootState) => state.offers.sent
  ),
  history: historyAdapter.getSelectors(
    (state: RootState) => state.offers.history
  ),
};

/* -------------------------------------------------------------------------- */
/*                                   SLICE                                    */
/* -------------------------------------------------------------------------- */

const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    clearOffers: () => initialState,
  },
  extraReducers: (builder) => {
    // RECEIVED
    builder.addCase(fetchReceivedOffersAsync.fulfilled, (state, action) => {
      receivedAdapter.setAll(state.received, action.payload);
    });

    // SENT
    builder.addCase(fetchSentOffersAsync.fulfilled, (state, action) => {
      sentAdapter.setAll(state.sent, action.payload);
    });

    // HISTORY
    builder.addCase(fetchTradeHistoryAsync.fulfilled, (state, action) => {
      historyAdapter.setAll(state.history, action.payload);
    });

    // SEND
    builder.addCase(sendOfferAsync.fulfilled, (state, action) => {
      sentAdapter.setAll(state.sent, action.payload);
    });

    // ACCEPT
    builder.addCase(acceptOfferAsync.fulfilled, (state, action) => {
      const offer = state.received.entities[action.payload.id];

      if (offer) {
        historyAdapter.addOne(state.history, offer);
        receivedAdapter.removeOne(state.received, action.payload.id);
      }
    });

    // REJECT
    // Like take-back, the thunk resolves with the bare offerId string on
    // success and a `{ success: false }` object on a handled failure.
    builder.addCase(rejectOfferAsync.fulfilled, (state, action) => {
      const offerId = action.payload;
      if (typeof offerId === "string" || typeof offerId === "number") {
        receivedAdapter.removeOne(state.received, offerId);
      }
    });

    // TAKE BACK
    // On success the thunk resolves with the bare offerId string; a handled
    // failure resolves with a `{ success: false }` object, which we ignore.
    builder.addCase(takeBackOfferAsync.fulfilled, (state, action) => {
      const offerId = action.payload;
      if (typeof offerId === "string" || typeof offerId === "number") {
        sentAdapter.removeOne(state.sent, offerId);
      }
    });

    // GLOBAL LOADING
    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );

    builder.addMatcher(
      (action) => action.type.endsWith("/fulfilled"),
      (state) => {
        state.loading = false;
      }
    );

    builder.addMatcher(
      (action: any) => action.type.endsWith("/rejected"),
      (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? "Error";
      }
    );
  },
});

/* -------------------------------------------------------------------------- */
/*                                EXPORTS                                     */
/* -------------------------------------------------------------------------- */

export const { clearOffers } = offersSlice.actions;

export const offersReducer = offersSlice.reducer;