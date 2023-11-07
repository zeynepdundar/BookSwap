import { AnyAction, createSlice, current } from "@reduxjs/toolkit";
import { signOut, userAuth } from "./auth-actions";

const initialState = {
  loading: false,
  user: null,
  userToken: null, // for storing the JWT
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    addBook: () => {},
  },
  extraReducers: (builder) => {
    //AUTHENTICATE USER
    builder.addCase(userAuth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userAuth.fulfilled, (state, action: AnyAction) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.user = {
        uid: action.payload.uid,
        fullName: action.payload.firstName,
      };
      state.userToken = "123456";
      console.log(current(state), action);
    });
    builder.addCase(userAuth.rejected, (state, action: AnyAction) => {
      state.loading = false;
      state.error = true;
    });

    //SIGN-OUT
    builder.addCase(signOut.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signOut.fulfilled, (state, action: AnyAction) => {
      state.loading = false;
      state.error = false;
      state.user = null;
      state.userToken = null;
    });
    builder.addCase(signOut.rejected, (state, action: AnyAction) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const selectUser = (state) => state.userAuth.user;
export const selectUserToken = (state) => state.userAuth.userToken;
export const selectIsLoading = (state) => state.userAuth.loading;

export default authSlice.reducer;
