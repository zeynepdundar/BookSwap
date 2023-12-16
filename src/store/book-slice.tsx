import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistBookIds: ["28694a0f-3da1-471f-bd96-142456e29d72"],
  libraryBookIds: [],
};

const bookSlice = createSlice({
  name: "bookList",
  initialState,
  reducers: {
    addBook: (state, action) => {
      if (action.payload.listType === "wishlist")
        state.wishlistBookIds.push(action.payload.id);
      if (action.payload.listType === "library")
        state.libraryBookIds.push(action.payload.id);
    },
    removeBook: (state, action) => {
      initialState.wishlistBookIds.filter((id) => id !== id);
      if (action.payload.listType === "wishlist")
        state.wishlistBookIds.splice(
          state.wishlistBookIds.indexOf(action.payload.id),
          1
        );
      if (action.payload.listType === "library")
        state.libraryBookIds.splice(
          state.libraryBookIds.indexOf(action.payload.id),
          1
        );
    },
  },
  extraReducers: (builder) => {},
});

export const addBook = bookSlice.actions.addBook;
export const removeBook = bookSlice.actions.removeBook;

export default bookSlice.reducer;
