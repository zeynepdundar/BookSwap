import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "@/store/auth";
import { profileReducer } from "@/store/profile";
import messagesReducer from "@/store/messages/messages-slice";


const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  messages: messagesReducer
});

export default rootReducer;

