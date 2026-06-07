import { useState } from "react";
import { BookListVertical } from "@/components/shared/BookListVertical";
import { ErrorAlert } from "../../BarcodeScannerScreen";
import {  Center } from "native-base";
import { useAddBooksToCollection } from "@/hooks/api/useAddBookToList";

export default function OtherUserWishlistScreen({ wishedBook }) {
  const [wishedBooks, setWishedBook] = useState(wishedBook);
  const [listError, setListError] = useState<string | null>(null);


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
        data={wishedBooks}
        onSecondaryAction={addBookToCollectionsHandler}
      />
        <ErrorAlert message={listError} />

    </Center>
  );
}
