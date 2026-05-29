import { createEntityAdapter, createSlice, EntityState } from "@reduxjs/toolkit";
import { Book } from "@/types/book.types";
import {
  addBookToCollectionsAsync,
  fetchUserProfileAsync,
  removeBookFromCollectionAsync,
} from "@/store/profile/thunks";

const booksAdapter = createEntityAdapter<Book>({
  selectId: (book) => book.id,
});

interface BooksState extends EntityState<Book> {
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = booksAdapter.getInitialState({
  loading: false,
  error: null,
});

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    clearBooks: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfileAsync.fulfilled, (state, action: any) => {
        const { wishlistBook, libraryBook } = action.payload;
        booksAdapter.setAll(state, [...(wishlistBook ?? []), ...(libraryBook ?? [])]);
      })
 // ADD BOOKS INTO ENTITY STORE
      .addCase(addBookToCollectionsAsync.fulfilled, (state, action: any) => {
                console.log("Adding books to store:", state, action);
        if (action.payload.books) {
          console.log("Adding books to store:", action.payload.books);
          booksAdapter.upsertMany(state, action.payload.books);
        }
      })

      // OPTIONAL: REMOVE NOT REQUIRED (because UI is ID-driven)
      .addCase(removeBookFromCollectionAsync.fulfilled, (state, action: any) => {
        console.log("Removing books from store:", action.payload.bookIds);
        booksAdapter.removeMany(state, action.payload.bookIds);
        // usually NOT needed unless you want memory cleanup
      });

      
  },
});

export const { clearBooks } = booksSlice.actions;
export const booksReducer = booksSlice.reducer;
export const booksSelectors = booksAdapter.getSelectors();
