import { useState, useEffect, useRef, useCallback } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
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

  // ActionSheet and Dialog states
  const [isActionSheetOpen, setIsActionSheetOpen] = useState<boolean>(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  // Dynamic Dialog Strings Configuration
  const getDialogContent = () => {
    if (selectedAction === BookCollections.WISHLIST) {
      return {
        title: i18n.t("successfully-added"),
        description: i18n.t("the-book-added-to-wishlist"),
        buttonVariant: "outline" as const,
        confirmButtonLabel: i18n.t("see-my-wishlist"),
        onPress: () => {
          setIsInfoDialogOpen(false);
          navigation.navigate("ProfileStack", { screen: "Wishlist" });
        }
      };
    }

    if (selectedAction === BookCollections.LIBRARY) {
      return {
        title: i18n.t("successfully-added"),
        description: i18n.t("the-book-added-to-library"),
        buttonVariant: "outline" as const,
        confirmButtonLabel: i18n.t("see-my-library"),
        onPress: () => {
          setIsInfoDialogOpen(false);
          navigation.navigate("ProfileStack", { screen: "Library" });
        }
      };
    }

    return {
      title: "Success",
      description: "Book processed successfully",
      buttonVariant: "outline" as const,
      confirmButtonLabel: "OK",
      onPress: () => setIsInfoDialogOpen(false)
    };
  };

  const dialogContent = getDialogContent();

  const handleOpenActions = (book: Book) => {
    Keyboard.dismiss();
    setSelectedBook(book);
    setIsActionSheetOpen(true);
  };

  const handleActionExecute = async (actionType: string) => {
    setIsActionSheetOpen(false);

    if (!selectedBook) return;

    const result = await pressDoneHandler({
      books: [selectedBook].flat(),
      collection: actionType,
    });

    if (result?.success) {
      setSelectedAction(actionType);

      // Delay mounting the Dialog until the ActionSheet unmounts cleanly
      setTimeout(() => {
        setIsInfoDialogOpen(true);
      }, 300);
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

  const navigateUserList = (item) => {
    const { photo_file_name, ...userWithoutPhoto } = item;
    navigation.navigate("UserList", { data: userWithoutPhoto });
  };

  const scanBarcodeHandler = () => {
    navigation.navigate("BarcodeScanner", {
      sourceScreen: sourceScreen,
      onAddBook: pressDoneHandler,
    });
  };

  // Safe error clearance handler wrapper
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Screen>
        <Box w="100%" h={9} justifyContent="center" px={4}>
          <Heading>{i18n.t("keep-exploring")}</Heading>
        </Box>

        <Flex h="80%">
          <Center w="100%" h={16} px={2}>
            <Input
              placeholder={i18n.t("search-book-by-title")}
              width="100%"
              value={searchQuery}
              onChangeText={setSearchQuery}
              borderRadius="6"
              py="3"
              px="1"
              fontSize="14"
              autoFocus
              _focus={{ borderColor: "#EFEFEF", bg: "#F4F4F6" }}
              ref={inputRef}
              InputLeftElement={
                <Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />
              }
              InputRightElement={
                <Icon m="2" mr="3" size="6" color="gray.400" onPress={scanBarcodeHandler} as={<MaterialIcons name="crop-free" />} />
              }
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
          </Center>

          <Box flex={1}>
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
        </Flex>

        <ActionSheet
          isOpen={isActionSheetOpen}
          onClose={() => setIsActionSheetOpen(false)}
          actions={actions}
        />

<InfoDialogBox
  isOpen={isInfoDialogOpen}
  onClose={() => {
    setIsInfoDialogOpen(false);
    setSelectedAction(null);
  }}
  selectedAction={selectedAction}
  navigation={navigation} // <-- Pass navigation here
/>

        <ErrorAlert message={listError} />
      </Screen>
    </TouchableWithoutFeedback>
  );
}