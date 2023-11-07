import { AnyAction, createSlice, current } from "@reduxjs/toolkit";
import { signOut } from "./auth-actions";

const initialState = {
  loading: false,
  user: null,
  userToken: null, // for storing the JWT
  error: null,
  success: false,
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: () => {},
  },
  extraReducers: (builder) => {


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

export default bookSlice.reducer;
