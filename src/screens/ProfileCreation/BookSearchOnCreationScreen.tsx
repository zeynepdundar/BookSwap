import { useEffect, useRef, useState } from "react";
import {
  Button,
  Heading,
  Image,
  FlatList,
  Box,
  Text,
  VStack,
  HStack,
  Flex,
  Pressable,
  Spacer,
  WarningTwoIcon,
  Center,
  Icon,
  Divider,
  Input,
  AspectRatio,
} from "native-base";

import { MaterialIcons } from "@expo/vector-icons";
import Screen from "../../components/Screen";
import i18n from "../../i18n";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { EditionEndpoints } from "../../api/endpoints";


const formatText = (inputText) => {
  const words = inputText.split(" ");

  const formattedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1)
  );

  const formattedText = formattedWords.join(" ");

  return formattedText;
};

export default function BookSearchOnCreationScreen({
  navigation,
  route = null,
}) {
  const { relatedScreen, onDonePress } = route.params;

  const importUrl = require("../../assets/images/no-cover-available.png");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);

  // const transformData = async (data) => {
  //   const transformedData = [];

  //   console.log("neyse", data);
  //   for (const item of data) {
  //     let coverUrl = null; // Set coverUrl to null initially

  //     if (item.isbn_13) {
  //       try {
  //         // Check if the cover image exists
  //         const response = await fetch(
  //           `https://covers.openlibrary.org/b/isbn/${item.isbn_13}-M.jpg`
  //         );

  //         if (response.ok) {
  //           coverUrl = `https://covers.openlibrary.org/b/isbn/${item.isbn_13}-M.jpg`;
  //         } else {
  //           console.warn(`Cover image not found for ISBN: ${item.isbn_13}`);
  //         }
  //       } catch (coverError) {
  //         console.error("Error fetching cover image:", coverError.message);
  //       }
  //       const transformedItem = {
  //         ...item,
  //         coverUrl,
  //       };
  //       console.log("Transformed cover image", transformedItem);

  //       transformedData.push(transformedItem);
  //     }
  //   }
  //   setSearchResults(transformedData);
  // };

  const addBookToListHandler = (selectedLibraryItem: any) => {
    setSelectedBooks((currentLibraryItems) => [
      ...currentLibraryItems,
      selectedLibraryItem,
    ]);
  };


  // const addBookToListHandler = (selectedItem: any) => {
  //   if (selectedItem.type === "wishlist")
  //     dispatch(addBookToWishlistAsync(selectedItem));
  //   else if (selectedItem.type === "library")
  //     dispatch(addBookToLibraryAsync(selectedItem));
  // };

  const removeBookFromListHandler = (id) => {
    setSelectedBooks((currentLibraryItems) =>
      currentLibraryItems.filter((item) => item.id !== id)
    );
  };

  const isSelectedBook = (id: string) => {
    const existingLibraryItemIndex = selectedBooks.findIndex(
      (item) => item.id === id
    );
    return existingLibraryItemIndex !== -1;
  };

  const fetchBooks = async (title) => {
    
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(EditionEndpoints.FETCH_EDITION_BY_TITLE(title));

      if (!response.ok) {
        throw new Error(`HTTP request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (!data || !data.editions || !Array.isArray(data.editions)) {
        throw new Error("Invalid or missing data structure from the server.");
      }

      const transformedData = data.editions.map((item) => ({
        id: item.id,
        title: item.title,
        publisher: item.publishers ? item.publishers[0] : "",
        // isbn_13: item.isbn_13 || item.isbn_11,
        coverUrl:
          item.isbn_13 && item.isbn_13 > 0
          ? EditionEndpoints.FETCH_COVER_OL(undefined,item.isbn_13)
          : null,
        author: item.author ? item.author : "",
      }));

      setSearchResults(transformedData);
      setLoading(false);

      return transformedData;
    } catch (error) {
      if (
        error instanceof TypeError &&
        error.message === "Network request failed"
      ) {
        setError(
          "Network request failed. Please check your internet connection."
        );
      } else {
        setError(`An error occurred: ${error.message} `);
      }
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };
  const inputRef = useRef(null);



  // useEffect(() => {
  //   // Focus on the input when the component mounts
  //   console.log("Entering", inputRef.current?._inputElement);
  //   inputRef.current?.inputElement?.focus();
  // }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 5) {
      const searchTimeout = setTimeout(async () => {
        try {
          const a = await fetchBooks(searchQuery);
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
      relatedScreen: "Library",
    });
  };
  const changeListStatusHandler = (item) => {
    const bookIsInList = isSelectedBook(item.id);

    if (bookIsInList) {
      removeBookFromListHandler(item.id);
    } else {
      addBookToListHandler(item);
    }
  };

  const handleDonePress = () => {
    // Pass selected items to the parent using the callback
    onDonePress(selectedBooks);
    navigation.goBack();
  };

  return (
    <Screen>
      <Flex h="100%">
        <Heading p={2}>{i18n.t("keep-exploring")}</Heading>

        {/* Search Bar Section */}
        <Center w="100%" h="20" px={2}>
          <Input
            placeholder={i18n.t("search-book-by-title")}
            width="100%"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            borderRadius="6"
            py="3"
            px="1"
            fontSize="14"
            _focus={{
              borderColor: "#EFEFEF",
              bg: "#F4F4F6",
            }}
            ref={inputRef}

            InputLeftElement={
              <Icon
                m="2"
                ml="3"
                size="6"
                color="gray.400"
                as={<MaterialIcons name="search" />}
              />
            }
            InputRightElement={
              <Icon
                m="2"
                mr="3"
                size="6"
                color="gray.400"
                onPress={scanBarcodeHandler}
                as={<MaterialIcons name="crop-free" />}
              />
            }
          />
        </Center>
        <Box>
          {loading && (
            <Box h="75%" alignItems="center" justifyContent="center">
              <LoadingOverlay />
            </Box>
          )}
          {!loading && !error && searchResults?.length > 0 && (
            <>
              <FlatList
                maxWidth="100%"
                height="75%"
                mx="3"
                data={searchResults}
                showsVerticalScrollIndicator={false}
                extraData={searchResults}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => {
                      changeListStatusHandler(item);
                    }}
                  >
                    <Box
                      borderWidth="1"
                      borderRadius="15"
                      height="130"
                      borderColor="#F1F1F1"
                      backgroundColor={
                        isSelectedBook(item.id) ? "primary.200" : "white"
                      }
                      p="3"
                      mx="2"
                      my="1"
                    >
                      <HStack
                        justifyContent="space-between"
                        width="100%"
                        space={3}
                        p={1}
                      >
                        <AspectRatio
                          w="20%"
                          ratio={{
                            base: 40 / 62,
                          }}
                        >
                          <Image
                            source={
                              item.coverUrl
                                ? { uri: item?.coverUrl }
                                : importUrl
                            }
                            alt={`Cover of ${item.title} by ${item.author}`}
                            roundedRight="4"
                          />

                          {/* {!item?.coverUrl && (
                            <Image
                              source={importUrl}
                              alt={`Cover of`}
                              roundedRight="6"
                            />
                          )} */}
                        </AspectRatio>

                        <VStack width="75%" h="95">
                          <Text color="#000000" fontSize="16">
                            {formatText(item.title)}
                          </Text>
                          <Text color="#8c8c8c" fontSize="11">
                            {formatText(item.author)}
                          </Text>
                          <Text
                            color="#000000"
                            fontSize="13px"
                            fontWeight="200"
                          >
                            {formatText(item.publisher)}
                          </Text>
                        </VStack>
                        <Box position="absolute" bottom="0" right="0">
                          <Icon
                            m="1"
                            size="6"
                            color={
                              isSelectedBook(item.id)
                                ? "primary.50"
                                : "primary.100"
                            }
                            as={
                              <MaterialIcons
                                name={
                                  isSelectedBook(item.id)
                                    ? "bookmark"
                                    : "bookmark-outline"
                                }
                              />
                            }
                          />
                        </Box>
                      </HStack>
                    </Box>
                  </Pressable>
                )}
                keyExtractor={(item) => item.id}
              />
              <Spacer />
              <Box alignItems="center" justifyContent="center" h="8%" mx="2">
                <Button
                  variant="outline"
                  onPress={handleDonePress}
                  right={0}
                  position="absolute"
                >
                  {i18n.t("done")}
                </Button>
              </Box>
            </>
          )}
          {searchQuery.length < 5 && (
            <VStack width="100%" height={200} mt="100">
              <Center>
                <Text fontSize="md">{i18n.t("find-favorite-books")}</Text>
              </Center>
              <Center w="100%">
                <Divider mt="3" mb="7" width={300} bg="#EEEEEE" />
                <Text textAlign="center" mx="30" fontWeight="200">
                  {relatedScreen === "Wishlist"
                    ? i18n.t("add-books-to-your-wishlist-to-start-swap")
                    : i18n.t("add-books-to-your-library-to-start-swap")}
                </Text>
              </Center>
            </VStack>
          )}
          {!error && searchResults.length === 0 && searchQuery.length > 4 && (
            <VStack width="100%" height={200} mt="100">
              <Center>
                <Text fontSize="md">
                  {i18n.t("no-results-for")} "{searchQuery}"
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
          {error &&  searchQuery?.length > 4 && (
            <Box h="75%" alignItems="center" justifyContent="center">
              <WarningTwoIcon size="5" mt="0.5" mx="2" color="error.500" />
              <Text
                mt={2}
                px={5}
                fontSize="xs"
                color="error.500"
                textAlign="center"
              >
                {error}
              </Text>
            </Box>
          )}
        </Box>
      </Flex>
    </Screen>
  );
}
