import { Center } from "native-base";
import i18n from "@/i18n";
import { BookListVertical } from "@/components/ui/BookListVertical";
import { useCallback, useEffect, useState } from "react";

import { useAddBooksToCollection } from "@/hooks/api/useAddBookToList";
import { useAppToast } from "@/hooks/useAppToast";
import { InfoDialogBox } from "@/components/Modal/InfoDialogBox";
import { Book, BookCollections } from "@/types/book.types";
import { Keyboard } from "react-native";
import { ActionSheet } from "@/components/ui/ActionSheet";
import { generateActions } from "@/utils/helper";

export default function OtherUserWishlistScreen({
  navigation,
  profile,
  libraryBook,
}) {
  const [userProfile, setUserProfile] = useState(profile);
  const [libraryBooks, setLibraryBooks] = useState(libraryBook);
  const toast = useAppToast();
  const [selectedBook, setSelectedBook] = useState<any>(null);

  const [isActionSheetOpen, setIsActionSheetOpen] = useState<boolean>(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);


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

  const handleOpenActions = useCallback((book: Book) => {
    console.log("hj", book)
    Keyboard.dismiss();
    setSelectedBook(book);
    setIsActionSheetOpen(true);
  }, []);
  const pressDoneHandler = async ({ collection, books }) => {
    Keyboard.dismiss();

    const targetCollection = collection;

    if (!targetCollection) {
      toast.error("No collection type specified.");
      return { success: false };
    }

    try {
      await addBooksToCollection({
        collection: targetCollection.toLowerCase(),
        books: [books].flat(),
      });
      return { success: true };
    } catch (error: any) {
      toast.error(error.message || "Failed to add book.");
      return { success: false };
    }
  };
  const handleActionExecute = async (actionType: string) => {
    // Step A: Slide down the ActionSheet immediately
    setIsActionSheetOpen(false);

    if (!selectedBook) return;

    // Step B: Dispatch the database API call
    const result = await pressDoneHandler({
      books: [selectedBook].flat(),
      collection: actionType,
    });

    if (result?.success) {
      setSelectedAction(actionType);

      // Step C: Wait for the ActionSheet's fade/slide animation to finish 
      // completely on the native thread before popping up the Dialog Box
      setTimeout(() => {
        setIsInfoDialogOpen(true);
      }, 300); // 300ms is the sweet spot for native animation unmounts
    } else {
      setSelectedBook(null);
    }
  };
  const getInfoDialogConfig = (selectedAction: string | null) => {
    if (selectedAction === BookCollections.WISHLIST) {
      return {
        title: i18n.t("successfully-added"),
        description: i18n.t("the-book-added-to-wishlist"),
        buttonLabel: i18n.t("see-my-wishlist"),
        onConfirm: () =>
          navigation.navigate("ProfileStack", { screen: "Wishlist" }),
      };
    }

    if (selectedAction === BookCollections.LIBRARY) {
      return {
        title: i18n.t("successfully-added"),
        description: i18n.t("the-book-added-to-library"),
        buttonLabel: i18n.t("see-my-library"),
        onConfirm: () =>
          navigation.navigate("ProfileStack", { screen: "Library" }),
      };
    }

    return null;
  };
    const actions = generateActions(handleActionExecute, () => setIsActionSheetOpen(false));
  
  const config = getInfoDialogConfig(selectedAction);
  return (
    <Center mt="6">
      <BookListVertical
        data={libraryBooks}
        onOpenActions={handleOpenActions}
        onSendOffer={sendOfferHandler}
      />
            <ActionSheet
              isOpen={isActionSheetOpen}
              onClose={() => setIsActionSheetOpen(false)}
              actions={actions}
            />
      {config && (
        <InfoDialogBox
          isOpen={isInfoDialogOpen}
          onClose={() => setIsInfoDialogOpen(false)}
          config={config}
        />
      )}
    </Center>
  );
}
