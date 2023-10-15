import { AnyAction, createSlice, current } from "@reduxjs/toolkit";
import { login, signOut } from "./auth-actions";

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
    //LOGIN
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action: AnyAction) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.user = {
        name: action.payload.user.displayName,
        isNewUser: action.payload.additionalUserInfo.isNewUser,
      };
      state.userToken = action.payload.user.uid;
      console.log(current(state), action);
    });
    builder.addCase(login.rejected, (state, action: AnyAction) => {
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
