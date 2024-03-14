import firestore from "@react-native-firebase/firestore";
import { useState } from "react";
export const useMessageSubscription = (firebaseUserId, setMessages) => {
    const [isLoading, setIsLoading] = useState(false);
  
    const subscribeToMessages = () => {
      setIsLoading(true); // Set loading state to true before subscribing
  
      const subscriber = firestore()
        .collection("Users")
        .doc(firebaseUserId)
        .collection("conversations")
        .onSnapshot(
          (querySnapshot) => {
            setMessages(querySnapshot.docs.map((doc) => ({
              conversationId: doc.data().conversationId,
              lastMessageText: doc.data().lastMessageText,
              lastMessageTime: doc.data().lastMessageTime.toDate(),
              unseenCount: doc.data().unseenCount,
              userId:  doc.data().userId
            })));
            setIsLoading(false); // Set loading state back to false after data fetching
          },
          (error) => {
            console.error("Error getting documents: ", error);
            setIsLoading(false); // Make sure to set loading state to false in case of error
          }
        );
  
      return () => subscriber();
    };
  
    return { subscribeToMessages, isLoading };
  };