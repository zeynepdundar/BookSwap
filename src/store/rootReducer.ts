import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import profileReducer from "./profile-slice";



const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer, // Add other reducers (slices) here
});

export default rootReducer;
