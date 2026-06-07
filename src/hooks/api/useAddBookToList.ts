import { useAppDispatch } from "@/hooks/common/useAppDispatch";
import { addBookToCollectionsAsync } from "@/store/books/thunks";
import { AddBooksPayload } from "@/types/book.types";

export const useAddBooksToCollection = () => {
  const dispatch = useAppDispatch();

  const addBooksToCollection = async (payload: AddBooksPayload) => {
    return dispatch(addBookToCollectionsAsync(payload)).unwrap();
  };

  return { addBooksToCollection };
};