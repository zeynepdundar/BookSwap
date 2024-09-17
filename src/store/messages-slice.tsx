import { createSlice } from "@reduxjs/toolkit";
import {  subscribeToMessages } from "./messages-actions";

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
})

export const { clearMessages, setMessages, setLoading, setError } = messagesSlice.actions;

export default messagesSlice.reducer;

