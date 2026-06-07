import {  Center } from "native-base";
import i18n from "@/i18n";
import { BookListVertical } from "@/components/shared/BookListVertical";
import { useEffect, useState } from "react";

import { ErrorAlert } from "../../BarcodeScannerScreen";
import { useAddBooksToCollection } from "@/hooks/api/useAddBookToList";

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
    navigation.navigate("SwapOfferProposal", {
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

    const { addBooksToCollection } = useAddBooksToCollection();
  
  const addBookToCollectionsHandler = async ({ collection, books }) => {
    try {
      await addBooksToCollection({
        collection: collection ,
        books: [books].flat(),
      });
      //navigation.goBack();
    } catch (error) {
      setListError(error.message);
    }

  };

  return (
    <Center mt="6">
      <BookListVertical
        data={libraryBooks}
        onSecondaryAction={addBookToCollectionsHandler}
        onSendOffer={sendOfferHandler}
      />
       <ErrorAlert message={listError} />
    </Center>
  );
}
