import { createEntityAdapter, createSlice, EntityState } from "@reduxjs/toolkit";
import { TradeOffer } from "@/types/offer.types";
import {
  fetchUserProfileAsync,
  fetchReceivedOffersAsync,
  fetchSentOffersAsync,
  sendOfferAsync,
} from "@/store/profile/thunks";

const offersAdapter = createEntityAdapter<TradeOffer>({
  selectId: (offer) => offer.id,
});

interface OffersState extends EntityState<TradeOffer> {
  loading: boolean;
  error: string | null;
}

const initialState: OffersState = offersAdapter.getInitialState({
  loading: false,
  error: null,
});

const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    clearOffers: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfileAsync.fulfilled, (state, action: any) => {
        const { receivedOffer, sentOffer } = action.payload;
        offersAdapter.setAll(state, [...(receivedOffer ?? []), ...(sentOffer ?? [])]);
      })
      .addCase(sendOfferAsync.fulfilled, (state, action) => {
        offersAdapter.upsertMany(state, action.payload as TradeOffer[]);
      })
      .addCase(fetchSentOffersAsync.fulfilled, (state, action) => {
        offersAdapter.upsertMany(state, action.payload as TradeOffer[]);
      })
      .addCase(fetchReceivedOffersAsync.fulfilled, (state, action) => {
        offersAdapter.upsertMany(state, action.payload as TradeOffer[]);
      });
  },
});

export const { clearOffers } = offersSlice.actions;
export const offersReducer = offersSlice.reducer;
export const offersSelectors = offersAdapter.getSelectors();
