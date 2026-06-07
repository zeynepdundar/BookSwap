import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { 
  fetchReceivedOffersAsync, 
  fetchSentOffersAsync, 
  fetchTradeHistoryAsync 
} from "@/store/offers/thunks";
import { offersSelectors } from "@/store/offers/slice";
import { AppDispatch } from "@/store";

export function useOffersSync() {
  const dispatch = useDispatch<AppDispatch>();
  
  // Get history count to check if we need to lazy-load
  const historyCount = useSelector(offersSelectors.history.selectTotal);

  // 1. Fetch Active Offers (Sent & Received) when screen comes into view
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchReceivedOffersAsync());
      dispatch(fetchSentOffersAsync());
    }, [dispatch])
  );

  // 2. Lazy load history only when explicitly requested
  const syncHistory = useCallback(() => {
    if (historyCount === 0) {
     // dispatch(fetchTradeHistoryAsync());
    }
  }, [dispatch, historyCount]);

  return { syncHistory };
}