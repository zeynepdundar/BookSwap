import { subscribeToMessages } from "@/store/messages/messages-actions";
import { useEffect, useState } from "react";

export const useMessageSubscription = (firebaseUserId: string | null) => {
  const [loading, setLoading] = useState(!!firebaseUserId);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!firebaseUserId) {
      console.log("❌ useMessageSubscription - No firebaseUserId");
      setLoading(false);
      setMessages([]);
      setError(null);
      return;
    }

    console.log("📨 useMessageSubscription - Starting subscription for:", firebaseUserId);
    setLoading(true);
    setError(null);

    const unsubscribe = subscribeToMessages(firebaseUserId, {
      onMessageReceived: (newMessages) => {
        console.log("📨 useMessageSubscription - Messages received:", newMessages.length);
        setMessages(newMessages);
        setLoading(false);
        setError(null);
      },
      onError: (error) => {
        console.error("📨 useMessageSubscription - Error:", error);
        setError(error);
        setLoading(false);
        setMessages([]);
      },
    });

    return () => {
      console.log("📨 useMessageSubscription - Cleaning up");
      unsubscribe?.();
    };
  }, [firebaseUserId]);

  return { loading, messages, error };
};
