import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth-slice";
import profileReducer from "./profile/profile-slice";
import messagesReducer from "./messages/messages-slice";


const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer, // Add other reducers (slices) here
  messages: messagesReducer
});

export default rootReducer;

