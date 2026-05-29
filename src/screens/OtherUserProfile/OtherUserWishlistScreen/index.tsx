import { useState } from "react";
import Screen from "@/components/shared/Screen";
import { BookListVertical } from "@/components/shared/BookListVertical";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import i18n from "@/i18n";
import { ErrorAlert } from "../../BarcodeScannerScreen";
import { Box, Center } from "native-base";
import { addBookToListAsync } from "@/store/profile/thunks";

export default function OtherUserWishlistScreen({ wishedBook }) {
  const [wishedBooks, setWishedBook] = useState(wishedBook);
  const [listError, setListError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const addBookToListHandler = async (selectedItem: any) => {
    try {
      const response = await dispatch(addBookToListAsync(selectedItem));
      const payload = response.payload;

      if (payload?.status === "error") {
        if (payload.existingEditionIds?.length > 0) {
          setListError(i18n.t("already-have-book"));
        } else {
          setListError(payload.message);
        }
        setTimeout(() => {
          setListError(null);
        }, 5000);

        return { success: false, message: payload.message };
      }
      return { success: true };
    } catch (error) {
      setListError(i18n.t("something-went-wrong"));
      setTimeout(() => {
        setListError(null);
      }, 5000);

      return { success: false, message: i18n.t("something-went-wrong") };
    }
  };

  return (
    <Center mt="6">
      <BookListVertical
        data={wishedBooks}
        onSecondaryAction={addBookToListHandler}
      />
      {listError && (
        <>
          <ErrorAlert message={listError} />
          {/* <Button onPress={() => setScanned(false)}>Tap to Scan Again</Button> */}
        </>
      )}
    </Center>
  );
}
