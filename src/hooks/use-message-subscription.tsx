import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { subscribeToMessages } from "../store/messages-actions";
import { clearMessages } from "../store/messages-slice";

export const useMessageSubscription = (firebaseUserId) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (firebaseUserId) {
      const unsubscribe = subscribeToMessages(firebaseUserId, {
        onMessageReceived: (newMessages) => {
          setMessages(newMessages);
          setLoading(false);
        },
        onError: (error) => {
          console.error(error);
          setLoading(false);
        },
      });

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
        setMessages([]);
        setLoading(true);
      };
    }
  }, [firebaseUserId]);

  return { loading, messages };
};
