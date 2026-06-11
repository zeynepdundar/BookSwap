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
      receivedAdapter.removeOne(state.received, action.payload.id);
      historyAdapter.addOne(state.history, action.payload);
    });

    // REJECT
    builder.addCase(rejectOfferAsync.fulfilled, (state, action) => {
      receivedAdapter.removeOne(state.received, action.payload.id);
    });

    // TAKE BACK
    builder.addCase(takeBackOfferAsync.fulfilled, (state, action) => {
      sentAdapter.removeOne(state.sent, action.payload.id);
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