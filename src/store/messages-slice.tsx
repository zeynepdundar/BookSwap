import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchMessagesAsync } from "./messages-actions";
import firestore from "@react-native-firebase/firestore";
import { AndroidLayerType } from "react-native-webview/lib/WebViewTypes";
import { subscribeToMessages } from "./messages-actions";

// import {
//   subscribeToMessages,
//   unsubscribeFromMessages,
// } from "./messages-actions";

// // Define async actions for fetching messages
// export const fetchMessagesAsync = createAsyncThunk(
//   "messages/fetchMessages",
//   async (userId, thunkAPI) => {
//     try {
//       const response = await fetch(`/api/messages?userId=${userId}`);
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
}

interface MessagesState {
  loading: boolean;
  error: null | string;
  messages: Message[];
  // subscriber: null | any;
}

const initialState: MessagesState = {
  loading: false,
  error: null,
  messages: [],
  // subscriber: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    // setSubscriber: (state, action) => {
    //   state.subscriber = action.payload;
    // },
    clearMessages: (state) => {
      state.messages = [];
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  
  },

  extraReducers: (builder) => {
    builder
      .addCase(subscribeToMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(subscribeToMessages.fulfilled, (state, action) => {
        state.loading = false;
        // state.subscriber = action.meta.arg;
      })
      .addCase(subscribeToMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
    }
      // .addCase(unsubscribeFromMessages.fulfilled, (state) => {
      //   state.subscriber = null;
      // })
      // .addCase(fetchMessagesAsync.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(fetchMessagesAsync.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.messages = action.payload;
      // })
      // .addCase(fetchMessagesAsync.rejected, (state, action) => {
      //   state.loading = false;
      //   // state.error = action.payload;
      // });
  // },
})

export const { clearMessages, setMessages, setLoading, setError } = messagesSlice.actions;

export default messagesSlice.reducer;

// export const subscribeToMessages = (firebaseUserId:AndroidLayerType) => async (dispatch) => {
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


