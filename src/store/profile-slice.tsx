import { createSlice, current } from "@reduxjs/toolkit";


const initialState = {
  loading: false,
  error: null,
  profile: { name: "", birthdate: "", gender: "", image: null, wishlistBookIds:[], libraryBookIds:[]},
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
      console.log("profileSlice:", current(state));
    },
    // setUserData: (state, action) => {
    //   const { name, birthdate, gender } = action.payload;
    //   state.name = name;
    //   state.birthdate = birthdate;
    //   state.gender = gender;
    // },
    clearProfileData: (state) => {
      state.profile = { name: '', birthdate: '', gender:"", image: null, wishlistBookIds:[], libraryBookIds:[] };
    },
    addBookToList: (state, action) => {
      if (action.payload.listType === "wishlist")
        state.profile.wishlistBookIds.push(action.payload.id);
      if (action.payload.listType === "library")
        state.profile.libraryBookIds.push(action.payload.id);
    },
    removeBookFromList: (state, action) => {
      initialState.profile.wishlistBookIds.filter((id) => id !== id);
      if (action.payload.listType === "wishlist")
        state.profile.wishlistBookIds.splice(
          state.profile.wishlistBookIds.indexOf(action.payload.id),
          1
        );
      if (action.payload.listType === "library")
        state.profile.libraryBookIds.splice(
          state.profile.libraryBookIds.indexOf(action.payload.id),
          1
        );
    },
  },
  extraReducers: (builder) => {},
});

export const { setProfileData, addBookToList, removeBookFromList } = profileSlice.actions;

export default profileSlice.reducer;
