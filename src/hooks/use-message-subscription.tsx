// import firestore from "@react-native-firebase/firestore";
// import { useState } from "react";
// export const useMessageSubscription = (firebaseUserId, setMessages) => {
//     const [isLoading, setIsLoading] = useState(false);
  
//     const subscribeToMessages = () => {
//       setIsLoading(true); // Set loading state to true before subscribing
  
//       const subscriber = firestore()
//         .collection("Users")
//         .doc(firebaseUserId)
//         .collection("conversations")
//         .onSnapshot(
//           (querySnapshot) => {
//             setMessages(querySnapshot.docs.map((doc) => ({
//               conversationId: doc.data().conversationId,
//               lastMessageText: doc.data().lastMessageText,
//               lastMessageTime: doc.data().lastMessageTime.toDate(),
//               unseenCount: doc.data().unseenCount,
//               userId:  doc.data().userId
//             })));
//             setIsLoading(false); // Set loading state back to false after data fetching
//           },
//           (error) => {
//             console.error("Error getting documents: ", error);
//             setIsLoading(false); // Make sure to set loading state to false in case of error
//           }
//         );
  
//       return () => subscriber();
//     };
  
//     return { subscribeToMessages, isLoading };
//   };


import { Action } from '@reduxjs/toolkit';

export interface SubscribeAction extends Action {
  payload: any; // or any other type based on your requirements
}

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { subscribeToMessages, unsubscribeFromMessages } from '../store/messages-actions';





export const useMessageSubscription = (firebaseUserId) => {
  const dispatch = useDispatch();
  const { loading, messages } = useSelector((state:any) => state.messages);

  console.log("subscribing to messages", loading, messages)
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

  return { loading ,  messages };
};