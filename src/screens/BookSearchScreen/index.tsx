import { useState, useEffect, useRef, useCallback } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Box, Center, Heading, VStack, Text, Divider, Button, Icon } from "native-base";
import i18n from "@/i18n";
import { MaterialIcons } from "@expo/vector-icons";

import { useAddBooks } from "@/hooks/api/useAddBooks";
import { fetchBooksByTitle } from "@/services/books/books.service";
import { Book, BookCollections } from "@/types/book.types";
import { BookListVertical } from "@/components/ui/BookListVertical";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import { BorderedBookListVertical } from "@/components/ui/BorderedBookListVertical";
import Screen from "@/components/ui/Screen";
import { generateActions } from "@/utils/helper";
import { ActionSheet } from "@/components/ui/ActionSheet";
import { InfoDialogBox } from "@/components/Modal/InfoDialogBox";
import { AppSearchBar } from "@/components/ui/AppSearchBar";

export default function BookSearchScreen({ navigation, route = null }) {
  const { sourceScreen, mode = "live" } = route.params ?? {};
  const collectionType = sourceScreen?.toLowerCase();

  const addBooks = useAddBooks(mode, collectionType);
  const inputRef = useRef(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Unified ActionSheet and Dialog UI Overlay states
  const [isActionSheetOpen, setIsActionSheetOpen] = useState<boolean>(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const pressDoneHandler = async ({ collection, books }) => {
    Keyboard.dismiss();
    inputRef.current?.blur?.();
    return addBooks({ collection, books });
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
      sourceScreen, // Pass clean primitive serializable data rules
      mode, // propagate the flow so the scanner persists to the right place
    });
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
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

  // Derived render states (mutually exclusive)
  const hasResults = !loading && !searchError && searchResults?.length > 0;
  const initialState = !loading && searchQuery.length < 3;
  const emptyState =
    !loading && !searchError && searchResults.length === 0 && searchQuery.length >= 3;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Screen>
        <Box w="100%" h={9} justifyContent="center" px={4}>
          <Heading fontWeight="500" size="xl">{i18n.t("discover-books")}</Heading>
        </Box>
        <Box px={2}>
          <AppSearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            scanBarcodeHandler={scanBarcodeHandler}
            inputRef={inputRef}
          />
        </Box>
        <VStack flex={1} mt="2">
          {loading && (
            <Box h="75%" alignItems="center" justifyContent="center">
              <LoadingOverlay />
            </Box>
          )}

          {hasResults && (
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

          {initialState && (
            <VStack
              flex={1}
              justifyContent="flex-start"
              alignItems="center"
              px={8}
              pt={12}
            >
              <Text
                fontSize="sm"
                color="coolGray.500"
                textAlign="center"
                maxW="85%"
              >
                {sourceScreen === BookCollections.WISHLIST
                  ? i18n.t("find-books-to-your-wishlist")
                  : i18n.t("find-books-to-your-library")}
              </Text>
            </VStack>
          )}

          {emptyState && (
            <VStack
              flex={1}
              justifyContent="flex-start"
              alignItems="center"
              pt={12}
              px={8}
              space={4}
            >
              <Box
                size={16}
                rounded="full"
                bg="primary.50"
                alignItems="center"
                justifyContent="center"
              >
                <Icon
                  as={MaterialIcons}
                  name="menu-book"
                  size="xl"
                  color="primary.600"
                />
              </Box>

              <Text
                fontSize="md"
                fontWeight="600"
                color="coolGray.900"
                textAlign="center"
              >
                {`${i18n.t("no-results-for")} "${searchQuery}"`}
              </Text>

              <Text
                fontSize="sm"
                color="coolGray.500"
                textAlign="center"
                maxW="80%"
                lineHeight="20px"
              >
                {i18n.t("try-scanning-its-barcode")}
              </Text>

              <Button
                mt={2}
                variant="outline"
                leftIcon={
                  <Icon
                    as={MaterialIcons}
                    name="qr-code-scanner"
                    size="sm"
                  />
                }
                onPress={scanBarcodeHandler}
              >
                {i18n.t("scan-barcode")}
              </Button>
            </VStack>
          )}
        </VStack>


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
      </Screen>
    </TouchableWithoutFeedback>
  );
}