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
    messagesLoading: (state) => {
      state.loading = true;
    },
    messagesReceived: (state, action) => {
      state.loading = false;
      state.messages = action.payload;
    },
    messagesError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    }
  },

})

export const { messagesLoading, messagesReceived, messagesError, clearMessages } = messagesSlice.actions;

export default messagesSlice.reducer;

