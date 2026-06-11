import { useState, useEffect, useRef, useCallback } from "react";
import { Keyboard, TouchableWithoutFeedback, DeviceEventEmitter } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Box, Flex, Center, Heading, Input, Icon, VStack, Text, Divider } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import i18n from "@/i18n";

import { useAddBooksToCollection } from "@/hooks/api/useAddBookToList";
import { fetchBooksByTitle } from "@/services/books/books.service";
import { Book, BookCollections } from "@/types/book.types";
import { BookListVertical } from "@/components/shared/BookListVertical";
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { BorderedBookListVertical } from "@/components/shared/BorderedBookListVertical";
import Screen from "@/components/shared/Screen";
import { generateActions } from "@/utils/helper";
import { ActionSheet } from "@/components/shared/ActionSheet";
import { InfoDialogBox } from "@/components/Modal/InfoDialogBox";
import { AppSearchBar } from "@/components/shared/AppSearchBar";

export default function BookSearchScreen({ navigation, route = null }) {
  const { sourceScreen } = route.params ?? {};
  const collectionType = sourceScreen?.toLowerCase();

  const { addBooksToCollection } = useAddBooksToCollection();
  const inputRef = useRef(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [listError, setListError] = useState<string | null>(null);

  // Unified ActionSheet and Dialog UI Overlay states
  const [isActionSheetOpen, setIsActionSheetOpen] = useState<boolean>(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const pressDoneHandler = async ({ collection, books }) => {
    Keyboard.dismiss();
    inputRef.current?.blur?.();
    setListError(null);

    const targetCollection = collection ?? collectionType;

    if (!targetCollection) {
      setListError("No collection type specified.");
      return { success: false };
    }

    try {
      await addBooksToCollection({
        collection: targetCollection.toLowerCase(),
        books: [books].flat(),
      });
      return { success: true };
    } catch (error: any) {
      setListError(error.message || "Failed to add book.");
      return { success: false };
    }
  };

  const handleOpenActions = useCallback((book: Book) => {
    Keyboard.dismiss();
    setSelectedBook(book);
    setIsActionSheetOpen(true);
  }, []);

  // 1. Action Sheet Execution Handler (For normal text list search selection)
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

  const actions = generateActions(handleActionExecute, () => setIsActionSheetOpen(false));


  // 2. Barcode Event Listener Handler (For camera scanning passes)
  useEffect(() => {
    const barcodeSubscription = DeviceEventEmitter.addListener(
      "BARCODE_BOOK_SCANNED",
      async (payload) => {

        // PATH A: Scanned from a specific collection (e.g., Wishlist view -> straight to Dialog)
        if (payload.collection) {
          const result = await pressDoneHandler({
            collection: payload.collection,
            books: payload.books,
          });

          if (result?.success) {
            setSelectedAction(payload.collection);
            DeviceEventEmitter.emit("BARCODE_SAVE_RESPONSE", { success: true, actionType: payload.collection });

            // Safe unwrap delay
            setTimeout(() => {
              setIsInfoDialogOpen(true);
            }, 300);
          } else {
            DeviceEventEmitter.emit("BARCODE_SAVE_RESPONSE", { success: false, error: "Failed to add book." });
          }
        }

        // PATH B: Scanned without collection stack (Opens ActionSheet overlay first!)
        else {
          setSelectedBook(payload.books[0]);
          setIsActionSheetOpen(true);
          DeviceEventEmitter.emit("BARCODE_SAVE_RESPONSE", { success: true, actionType: null });
        }
      }
    );

    return () => barcodeSubscription.remove();
  }, [collectionType, sourceScreen, selectedBook]);
  const fetchBooks = async (title) => {
    setLoading(true);
    fetchBooksByTitle(title)
      .then((books) => {
        setSearchResults(books);
        setSearchError(null);
      })
      .catch((err) => {
        setSearchError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Debounced Auto-Search
  useEffect(() => {
    if (searchQuery.length >= 3) {
      const searchTimeout = setTimeout(async () => {
        try {
          await fetchBooks(searchQuery);
        } catch (error: any) {
          console.error("Error fetching data:", error.message);
        }
      }, 500);

      return () => clearTimeout(searchTimeout);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const navigateUserList = (item) => {
    const { photo_file_name, ...userWithoutPhoto } = item;
    navigation.navigate("UserList", { data: userWithoutPhoto });
  };

  const scanBarcodeHandler = () => {
    navigation.navigate("BarcodeScanner", {
      sourceScreen: sourceScreen, // Pass clean primitive serializable data rules
    });
  };

  useEffect(() => {
    if (listError) {
      const timer = setTimeout(() => {
        setListError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [listError]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setListError(null);
        setIsInfoDialogOpen(false);
        setIsActionSheetOpen(false);
      };
    }, [])
  );
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
  const config = getInfoDialogConfig(selectedAction);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Screen>
        <Box w="100%" h={9} justifyContent="center" px={4}>
          <Heading>{i18n.t("keep-exploring")}</Heading>
        </Box>
        <Box px={2}>
          <AppSearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            scanBarcodeHandler={scanBarcodeHandler}
            inputRef={inputRef}
          />
        </Box>
        <Box flex={1} mt="2">
          {loading && (
            <Box h="75%" alignItems="center" justifyContent="center">
              <LoadingOverlay />
            </Box>
          )}




          {!loading && !searchError && searchResults?.length > 0 && (
            <>
              {collectionType ? (
                <BorderedBookListVertical data={searchResults} onDonePress={pressDoneHandler} />
              ) : (
                <BookListVertical
                  data={searchResults}
                  onOpenActions={handleOpenActions}
                  onNavigateList={navigateUserList}
                  showOwners={!collectionType}
                />
              )}
            </>
          )}

          {searchQuery.length < 3 && (
            <VStack width="100%" height={200} mt="100">
              <Center>
                <Text fontSize="md">{i18n.t("find-favorite-books")}</Text>
              </Center>
              <Center w="100%">
                <Divider mt="3" mb="7" width={300} bg="#EEEEEE" />
                <Text textAlign="center" mx="30" fontWeight="200">
                  {sourceScreen === BookCollections.WISHLIST
                    ? i18n.t("add-books-to-your-wishlist-to-start-swap")
                    : i18n.t("add-books-to-your-library-to-start-swap")}
                </Text>
              </Center>
            </VStack>
          )}

          {!searchError && searchResults.length === 0 && searchQuery.length >= 3 && (
            <VStack width="100%" height={200} mt="100">
              <Center w="100%">
                <Text fontSize="md" alignSelf="center" maxWidth={360} textAlign="center">
                  {`${i18n.t("no-results-for")} "${searchQuery}"`}
                </Text>
              </Center>
              <Center w="100%">
                <Divider mt="3" mb="7" width={300} bg="#EEEEEE" />
                <Text textAlign="center" mx="30" fontWeight="200">
                  {i18n.t("we-do-not-have-the-book-yet")}
                </Text>
              </Center>
            </VStack>
          )}
        </Box>


        {/* Global UI sheets share state variables interchangeably */}
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

        <ErrorAlert message={listError} />


      </Screen>
    </TouchableWithoutFeedback>
  );
}