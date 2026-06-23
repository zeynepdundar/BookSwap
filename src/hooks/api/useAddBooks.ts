import { useCallback } from "react";
import { useAddBooksToCollection } from "@/hooks/api/useAddBookToList";
import { useAppDispatch } from "@/hooks/common/useAppDispatch";
import { addBooksToOnboarding } from "@/store/onboarding/slice";
import { useAppToast } from "@/hooks/useAppToast";
import { Book, BookCollection } from "@/types/book.types";

export type AddBooksMode = "live" | "onboarding";

interface AddBooksArgs {
  collection?: string;
  books: Book[];
}

/**
 * Adds books to a collection, branching on the current flow:
 *  - "live": persists through the collections API (existing users)
 *  - "onboarding": stages books in the onboarding redux slice (new users,
 *    not yet created server-side)
 *
 * The returned handler keeps the same `({ collection, books }) => { success }`
 * contract in both modes, so the search UI is identical across flows.
 */
export function useAddBooks(mode: AddBooksMode, collectionType?: string) {
  const { addBooksToCollection } = useAddBooksToCollection();
  const dispatch = useAppDispatch();
  const toast = useAppToast();

  return useCallback(
    async ({ collection, books }: AddBooksArgs) => {
      const targetCollection = (collection ?? collectionType)?.toLowerCase();

      if (!targetCollection) {
        toast.error("No collection type specified.");
        return { success: false };
      }

      const payload = {
        collection: targetCollection as BookCollection,
        books: [books].flat(),
      };

      if (mode === "onboarding") {
        try {
          dispatch(addBooksToOnboarding(payload));
          return { success: true };
        } catch {
          return { success: false };
        }
      }

      try {
        await addBooksToCollection(payload);
        return { success: true };
      } catch (error: any) {
        toast.error(error.message || "Failed to add book.");
        return { success: false };
      }
    },
    [mode, collectionType, addBooksToCollection, dispatch, toast]
  );
}
