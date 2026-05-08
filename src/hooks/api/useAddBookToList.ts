import { useAppDispatch } from "@/hooks/common/useAppDispatch";
import i18n from "@/i18n";
import { addBookToListAsync } from "@/store/profile";
import { Keyboard } from "react-native";


export const useAddBookToList = (setListError: any) => {
  const dispatch = useAppDispatch();

  const addBookToList = async (selectedItem: any) => {
    Keyboard.dismiss();

    try {
      const result = await dispatch(addBookToListAsync(selectedItem)).unwrap();
      return { success: true, data: result };
    } catch (error: any) {
      const message =
        error?.code === "BOOK_ADD_ERROR"
          ? i18n.t("already-have-book")
          : i18n.t("something-went-wrong");

      setListError(message);

      setTimeout(() => setListError(null), 5000);

      return { success: false, message };
    }
  };

  return { addBookToList };
};