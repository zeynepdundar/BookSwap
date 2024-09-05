import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  subscribeToMessages,
  unsubscribeFromMessages,
} from "../store/messages-actions";

export const useMessageSubscription = (firebaseUserId) => {
  const dispatch = useDispatch();
  const { loading, messages } = useSelector((state: any) => state.messages);

  useEffect(() => {
    if (firebaseUserId) {
      dispatch(subscribeToMessages(firebaseUserId) as any);
    }

    return () => {
      // if (subscriber) {
      //   // dispatch(unsubscribeFromMessages(firebaseUserId) as any);
      // }
    };
  }, [firebaseUserId, dispatch]);

  return { loading, messages };
};
