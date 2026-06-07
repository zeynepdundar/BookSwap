import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../types";
import { addBookToCollections, removeBookFromCollection } from "@/services/books/books.service";
import { AddBooksPayload, RemoveBooksPayload } from "@/types/book.types";

export const addBookToCollectionsAsync = createAsyncThunk(
  "profile/addBookToCollections",
  async (payload: AddBooksPayload, { getState }) => {
    const state = getState() as RootState;
    const userId = state.profile.profile?.id;

    if (!userId) throw new Error("User not found");

    await addBookToCollections(userId, payload);

    return payload;
  }
);

export const removeBookFromCollectionAsync = createAsyncThunk(
  "profile/removeBookFromCollection",
  async (payload: RemoveBooksPayload, { getState }) => {
    try {
      const state = getState() as RootState;

      const userId = state.profile.profile?.id;

      if (!userId) throw new Error("User not found");

      await removeBookFromCollection(userId, payload);

      console.log("delete:", payload);
      return payload;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);