import { createAsyncThunk } from "@reduxjs/toolkit";
import firestore from "@react-native-firebase/firestore";

import { setError, setLoading, setMessages } from "./messages-slice";

export const subscribeToMessages = createAsyncThunk(
  "messages/subscribeToMessages",
  async (firebaseUserId: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));

      console.log("subscribed to messages",firebaseUserId);

      const subscriber = firestore()
        .collection("Users")
        .doc(firebaseUserId)
        .collection("conversations")
        .onSnapshot((querySnapshot) => {
          console.log("querySnapshot",querySnapshot);

          const messages = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              conversationId: data.conversationId,
              lastMessageText: data.lastMessageText,
              lastMessageTime: data.lastMessageTime.toDate().toISOString(),
              unseenCount: data.unseenCount,
              userId: data.userId,
            };
          });
          dispatch(setMessages(messages));
        });
    } catch (error) {
      console.error("Failed to subscribe to messages: ", error);
      return rejectWithValue(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const resetUnseenCount = async (relatedChat: any) => {
  try {
    const { friendUserId, firebaseUserId } = relatedChat;

    await firestore()
      .collection("Users")
      .doc(firebaseUserId)
      .collection("conversations")
      .doc(friendUserId)
      .update({
        unseenCount: 0,
      });
  } catch (error) {
    console.error("Failed to reset unseen count: ", error);
    return;
  } finally {
  }
};
export const updateLastMessage = async (relatedChat: any) => {
  const { friendUserId, currentUserId, messageData } = relatedChat;
  const timestamp = firestore.Timestamp.fromDate(new Date());

  try {
    await firestore()
      .collection("Users")
      .doc(currentUserId)
      .collection("conversations")
      .doc(friendUserId)
      .update({
        lastMessageText: messageData.text,
        lastMessageTime: timestamp,
      });
  } catch (error) {
    console.error("Failed to update last message: ", error);
    // Optionally, you can handle error here without needing to return to Redux
  }
};

export const unsubscribeFromMessages = (subscriber: any) => (dispatch) => {
  if (subscriber) {
    subscriber();
    // dispatch(setSubscriber(null));
  }
};
