import { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

import {
  Heading,
  Box,
  Text,
  VStack,
  Flex,
  Center,
  Icon,
  Divider,
  Input,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import Screen from "@/components/shared/Screen";
import i18n from "@/i18n";
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { BookListVertical } from "@/components/shared/BookListVertical";
import { BorderedBookListVertical } from "@/components/shared/BorderedBookListVertical";
import { ErrorAlert } from "../BarcodeScannerScreen";
import { BookCollections } from "@/types/book.types";
import { fetchBooksByTitle } from "@/services/books/books.service";
import { useAddBooksToCollection } from "@/hooks/api/useAddBookToList";
import { useFocusEffect } from "@react-navigation/native";

export default function BookSearchScreen({ navigation, route = null }) {
  const { sourceScreen } = route.params ?? {};
  // const { searchedBook } = route.params || {};

  const collectionType = sourceScreen?.toLowerCase();

  const { addBooksToCollection } = useAddBooksToCollection();

  const inputRef = useRef(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [listError, setListError] = useState<string | null>(null);

  // useEffect(() => {
  //   if (searchedBook) {
  //     setSearchQuery(searchedBook || ""); // Set search query to the book's title
  //   }
  // }, [searchedBook]);



  const pressDoneHandler = async ({ collection, books }) => {
    Keyboard.dismiss();
    inputRef.current?.blur?.();

    setListError(null);
    

    try {
      await addBooksToCollection({
        collection: collection ?? collectionType,
        books: [books].flat(),
      });
      //navigation.goBack();
    } catch (error) {
      setListError(error.message);
    }

  };

  const navigateUserList = (item) => {
    const { photo_file_name, ...userWithoutPhoto } = item; // Destructure to omit photo_file_name
    navigation.navigate("UserList", {
      data: userWithoutPhoto, // Pass the user object without the photo_file_name
    });
  };

  const fetchBooks = async (title) => {
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

  // useEffect(() => {
  //   // Focus on the input when the component mounts
  //   console.log("Entering", inputRef.current?._inputElement);
  //   inputRef.current?.inputElement?.focus();
  // }, []);


  useEffect(() => {
    if (searchQuery.length >= 3) {
      const searchTimeout = setTimeout(async () => {
        try {
          await fetchBooks(searchQuery);
        } catch (error) {
          console.error("Error fetching or transforming data:", error.message);
        } finally {
        }
      }, 500);

      return () => clearTimeout(searchTimeout);
    }
  }, [searchQuery]);

  const scanBarcodeHandler = () => {
    navigation.navigate("BarcodeScanner", {
      sourceScreen: sourceScreen,
      onAddBook: pressDoneHandler,
    });
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setListError(null);
      };
    }, [])
  );

  // TODO: Consider lifting selection state from child component (BorderedBookListVertical) to parent
  // so that selection and error state can be coordinated more reliably
  setTimeout(() => {
    setListError(null);
  }, 5000);

return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Screen>
        <Box
          w="100%"
          h={9}
          alignItems="flex"
          justifyContent="center"
          px={4}
        >
          <Heading>{i18n.t("keep-exploring")}</Heading>
        </Box>
        
        <Flex h="80%">
          {/* Search Bar Section */}
          <Center w="100%" h={16} px={2}>
            <Input
              placeholder={i18n.t("search-book-by-title")}
              width="100%"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
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
          
          <Box flex={1}> {/* Made this box flexible to safely fill the remaining h="80%" layout */}
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
                    onSecondaryAction={pressDoneHandler}
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

        <ErrorAlert message={listError} />
        
      </Screen>
    </TouchableWithoutFeedback>
  );
}
