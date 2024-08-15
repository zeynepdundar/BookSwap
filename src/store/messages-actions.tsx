import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firestore from "@react-native-firebase/firestore";
import { setError, setLoading, setMessages } from "./messages-slice";

// export const subscribeToMessages = createAsyncThunk(
//   "messages/subscribeToMessages",
//   async (firebaseUserId:any, { dispatch }) => {
//     return new Promise((resolve, reject) => {
//       const subscriber = firestore()
//         .collection("Users")
//         .doc(firebaseUserId)
//         .collection("conversations")
//         .onSnapshot(
//           (querySnapshot) => {
//             const messages = querySnapshot.docs.map((doc) => ({
//               conversationId: doc.data().conversationId,
//               lastMessageText: doc.data().lastMessageText,
//               lastMessageTime: doc.data().lastMessageTime.toDate(),
//               unseenCount: doc.data().unseenCount,
//               userId: doc.data().userId,
//             }));
//             dispatch(setMessages(messages));
//             // resolve();
//           },
//           (error) => {
//             reject(error);
//           }
//         );

//       // Return the subscriber to allow unsubscribing later
//       return subscriber;
//     });
//   }
// );

// export const unsubscribeFromMessages = createAsyncThunk(
//   "messages/unsubscribeFromMessages",
//   async (subscriber) => {
//     // if (subscriber) {
//     //   subscriber(); // Unsubscribe from Firestore updates
//     // }
//   }
// );

// export const fetchMessagesAsync = createAsyncThunk(
//   'messages/fetchMessages',
//   async (userId, thunkAPI) => {
//     const messages = await fetchUserMessages("userId");
//     return messages;
//   }
// );

// export const subscribeToMessages = (firebaseUserId:any) => async (dispatch) => {
//   dispatch(setLoading(true));
//   const subscriber = firestore()
//     .collection('Users')
//     .doc(firebaseUserId)
//     .collection('conversations')
//     .onSnapshot(
//       (querySnapshot) => {
//         const messages = querySnapshot.docs.map((doc) => ({
//           conversationId: doc.data().conversationId,
//           lastMessageText: doc.data().lastMessageText,
//           lastMessageTime: doc.data().lastMessageTime.toDate(),
//           unseenCount: doc.data().unseenCount,
//           userId: doc.data().userId,
//         }));
//         dispatch(setMessages(messages));
//         dispatch(setLoading(false));
//       },
//       (error) => {
//         console.error('Error getting documents: ', error);
//         dispatch(setError(error.message));
//         dispatch(setLoading(false));
//       }
//     );

//   dispatch(setSubscriber(subscriber));
// };

// export const subscribeToMessages = createAsyncThunk(
//   'messages/subscribeToMessages',
//   async (firebaseUserId:string, thunkAPI) => {
//     try {
//       thunkAPI.dispatch(setLoading(true));

//       const subscriber = firestore()
//         .collection('Users')
//         .doc(firebaseUserId)
//         .collection('conversations')
//         .onSnapshot(
//           (querySnapshot) => {
//             const messages = querySnapshot.docs.map((doc) => ({
//               conversationId: doc.data().conversationId,
//               lastMessageText: doc.data().lastMessageText,
//               lastMessageTime: doc.data().lastMessageTime.toDate(),
//               unseenCount: doc.data().unseenCount,
//               userId: doc.data().userId,
//             }));
//             thunkAPI.dispatch(setMessages(messages));
//             thunkAPI.dispatch(setLoading(false));
//           },
//           (error) => {
//             console.error('Error getting documents: ', error);
//             thunkAPI.dispatch(setError(error.message));
//             thunkAPI.dispatch(setLoading(false));
//           }
//         );
//         thunkAPI.dispatch(setSubscriber(subscriber));
//       } catch (error) {
//         return thunkAPI.rejectWithValue(error.message);
//       }
//     }
//   );
  

  // export const unsubscribeFromMessages = (subscriber:any) => (dispatch) => {
  //   if (subscriber) {
  //     subscriber();
  //     dispatch(setSubscriber(null));
  //   }
  // };
  
  export const subscribeToMessages = createAsyncThunk(
    'messages/subscribeToMessages',
    async (firebaseUserId:string, { dispatch, rejectWithValue }) => {
      try {
        dispatch(setLoading(true));
  
        const subscriber = firestore()
          .collection('Users')
          .doc(firebaseUserId)
          .collection('conversations')
          .onSnapshot(
            (querySnapshot) => {
              const messages = querySnapshot.docs.map((doc) => ({
                conversationId: doc.data().conversationId,
                lastMessageText: doc.data().lastMessageText,
                lastMessageTime: doc.data().lastMessageTime.toDate().toISOString(),
                unseenCount: doc.data().unseenCount,
                userId: doc.data().userId,
              }));
              console.log("User msg",messages)
              dispatch(setMessages(messages));
              dispatch(setLoading(false));
            },
            (error) => {
              console.error('Error getting documents: ', error);
              dispatch(setError(error.message));
              dispatch(setLoading(false));
            }
          );
  
        // dispatch(setSubscriber(subscriber));
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const unsubscribeFromMessages = (subscriber:any) => (dispatch) => {
    if (subscriber) {
      subscriber();
      // dispatch(setSubscriber(null));
    }
  };
  