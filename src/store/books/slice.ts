import {
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AddBooksPayload, Book, BookCollections, RemoveBooksPayload } from "@/types/book.types";
import {

  fetchUserProfileAsync,

} from "@/store/profile/thunks";
import { addBookToCollectionsAsync, removeBookFromCollectionAsync } from "./thunks";

/* -------------------------------------------------------------------------- */
/*                              ENTITY ADAPTER                                */
/* -------------------------------------------------------------------------- */

const booksAdapter = createEntityAdapter<Book>({
  selectId: (book) => book.id,
});

/* -------------------------------------------------------------------------- */
/*                                STATE TYPE                                  */
/* -------------------------------------------------------------------------- */

interface BooksState extends EntityState<Book> {
  loading: boolean;
  error: string | null;
  wishlistIds: string[] ; // Depending on how book IDs are structured
  libraryIds: string[]; // Depending on how book IDs are structured
}

/* -------------------------------------------------------------------------- */
/*                               INITIAL STATE                                */
/* -------------------------------------------------------------------------- */

const initialState: BooksState = booksAdapter.getInitialState({
  loading: false,
  error: null,
  wishlistIds: [],
  libraryIds: [],
});

/* -------------------------------------------------------------------------- */
/*                                 SLICE                                      */
/* -------------------------------------------------------------------------- */

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    clearBooks: () => initialState,
    addBooksToCollections: (state, action: PayloadAction<AddBooksPayload> ) => {
      const { books, collection } = action.payload;

      booksAdapter.upsertMany(state, books);

      const bookIds = books.map((book) => Number(book.id));

      if (collection === BookCollections.WISHLIST) {
        state.wishlistIds = [
          ...new Set([...bookIds, ...state.wishlistIds]),
        ];
      }

      if (collection === BookCollections.LIBRARY) {
        state.libraryIds = [
          ...new Set([...bookIds, ...state.libraryIds]),
        ];
      }
    },
    removeBooksFromCollections: (state, action: PayloadAction<RemoveBooksPayload>) => {
      const { collection, bookIds } = action.payload;

      if (collection === BookCollections.WISHLIST) {
        state.wishlistIds = state.wishlistIds.filter(
          (id) => !bookIds.includes(id)
        );
      }

      if (collection === BookCollections.LIBRARY) {
        state.libraryIds = state.libraryIds.filter(
          (id) => !bookIds.includes(id)
        );
      }

      // Remove entities that are no longer referenced by any collection
      const orphanedIds = bookIds.filter(
        (id) =>
          !state.wishlistIds.includes(id) &&
          !state.libraryIds.includes(id)
      );

      booksAdapter.removeMany(state, orphanedIds);
    },
  },
  extraReducers: (builder) => {
    builder

      /* ------------------------ HYDRATE FROM PROFILE ------------------------ */
      .addCase(fetchUserProfileAsync.fulfilled, (state, action: any) => {
        const wishlist = action.payload.wishlistBook ?? [];
        const library = action.payload.libraryBook ?? [];

        booksAdapter.setAll(state, [...wishlist, ...library]);

        state.wishlistIds = wishlist.map((b: Book) => b.id);
        state.libraryIds = library.map((b: Book) => b.id);
      })

      /* ------------------------ ADD BOOK TO COLLECTION ------------------------ */
      .addCase(addBookToCollectionsAsync.fulfilled, (state, action) => {
        const { books, collection } = action.payload;

        if (!books?.length) return;

        booksAdapter.upsertMany(state, books);

        const bookIds = books.map((book) => book.id);

        if (collection === BookCollections.WISHLIST) {
          state.wishlistIds = [
            ...new Set([...bookIds, ...state.wishlistIds]),
          ];
        }

        if (collection === BookCollections.LIBRARY) {
          state.libraryIds = [
            ...new Set([...bookIds, ...state.libraryIds]),
          ];
        }
      })

      /* ------------------------ REMOVE FROM COLLECTION ------------------------ */

      /*booksAdapter.removeMany() is only correct if a book can never exist in both wishlist and library simultaneously.*/
      .addCase(removeBookFromCollectionAsync.fulfilled, (state, action: any) => {
        const { bookIds, collection } = action.payload;

        booksAdapter.removeMany(state, bookIds);

        if (collection === BookCollections.WISHLIST) {
          state.wishlistIds = state.wishlistIds.filter(
            (id) => !bookIds.includes(id)
          );
        }

        if (collection === BookCollections.LIBRARY) {
          state.libraryIds = state.libraryIds.filter(
            (id) => !bookIds.includes(id)
          );
        }
      });
  },
});

/* -------------------------------------------------------------------------- */
/*                                EXPORTS                                     */
/* -------------------------------------------------------------------------- */

export const { clearBooks, addBooksToCollections, removeBooksFromCollections } = booksSlice.actions;
export const booksReducer = booksSlice.reducer;
export const booksSelectors = booksAdapter.getSelectors();