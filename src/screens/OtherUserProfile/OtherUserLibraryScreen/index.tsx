import { Box, Button, Center } from "native-base";
import i18n from "@/i18n";
import Screen from "@/components/shared/Screen";
import { BookListVertical } from "@/components/shared/BookListVertical";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { ErrorAlert } from "../../BarcodeScannerScreen";
import { addBookToListAsync } from "@/store/profile/thunks";

export default function OtherUserWishlistScreen({
  navigation,
  profile,
  libraryBook,
}) {
  const [userProfile, setUserProfile] = useState(profile);
  const [libraryBooks, setLibraryBooks] = useState(libraryBook);
  const [listError, setListError] = useState<string | null>(null);

  useEffect(() => {
    setUserProfile(profile);
  }, [profile]);

  const sendOfferHandler = async (selectedItem: any) => {
    navigation.navigate("TradeProposal", {
      data: {
        user: userProfile,
        book: {
          author: selectedItem.item.author,
          coverUrl: selectedItem.item.coverUrl,
          id: selectedItem.item.id,
          publisher: selectedItem.item.publisher,
          title: selectedItem.item.title,
        },
      },
    });
  };

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
        data={libraryBooks}
        onSecondaryAction={addBookToListHandler}
        onSendOffer={sendOfferHandler}
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
