import { createEntityAdapter, createSlice, EntityState } from "@reduxjs/toolkit";
import { TradeOffer } from "@/types/offer.types";
import {
  fetchUserProfileAsync,
  fetchTradeHistoryAsync,
} from "@/store/profile/thunks";

const historyAdapter = createEntityAdapter<TradeOffer>({
  selectId: (item) => item.id,
});

interface HistoryState extends EntityState<TradeOffer> {
  loading: boolean;
  error: string | null;
}

const initialState: HistoryState = historyAdapter.getInitialState({
  loading: false,
  error: null,
});

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    clearHistory: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfileAsync.fulfilled, (state, action: any) => {
        historyAdapter.setAll(state, action.payload.historyList ?? []);
      })
      .addCase(fetchTradeHistoryAsync.fulfilled, (state, action) => {
        historyAdapter.setAll(state, action.payload as TradeOffer[]);
      });
  },
});

export const { clearHistory } = historySlice.actions;
export const historyReducer = historySlice.reducer;
export const historySelectors = historyAdapter.getSelectors();
