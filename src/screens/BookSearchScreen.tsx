import { useState } from "react";
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
} from "native-base";
import i18n from "../i18n";
import Screen from "../components/Screen";
import SearchBar from "../components/shared/SearchBar";
import { MaterialIcons } from "@expo/vector-icons";
import { LoadingOverlay } from "../components/LoadingOverlay";

export default function BookSearchScreen({ navigation, route = null }) {
  const mode = route?.params?.relatedScreen;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [searchResults, setSearchResults] = useState([]);

  const [libraryItems, setLibraryItem] = useState<any>([]);

  const addLibraryItemHandler = (selectedLibraryItem: any) => {
    setLibraryItem((currentLibraryItems) => [
      ...currentLibraryItems,
      { id: selectedLibraryItem.id, title: selectedLibraryItem.title },
    ]);
  };

  const removeLibraryItemHandler = (id: string) => {
    setLibraryItem((currentLibraryItems) => {
      return currentLibraryItems.filter((item) => item.id !== id);
    });
  };

  const isSelectedItem = (id: string) => {
    const existingLibraryItemIndex = libraryItems.findIndex(
      (item) => item.id === id
    );
    return existingLibraryItemIndex !== -1;
  };

  const fetchBooks = async (title) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `http://3.76.204.31:4000/search/titles/${title}?page=1&page_size=50`
      );

      if (!response.ok) {
        throw new Error(`HTTP request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data === null || data === '') {
        throw new Error('Received null response from the server.');
      }


      console.log("dgsdg",data)

      const transformedData = data.editions.map((item) => ({
        id: item.id,
        title: item.title?.slice(0, 20),
        publisher: item.publishers[0],
        coverUrl: (item.isbn_13 && item.isbn_13 > 0) ? `https://covers.openlibrary.org/b/${"isbn"}/${item.isbn_13}-${"M"}.jpg` : null,
        author: item.authors ? item.authors["name"] : null,
      }));

      // Update searchResults state with the transformed data
      setSearchResults(transformedData);
      setLoading(false);
      return data.editions;
    } catch (error) {
      // Check if the error is due to a network failure
      if (
        error instanceof TypeError &&
        error.message === "Network request failed"
      ) {
        setError(
          "Network request failed. Please check your internet connection."
        );
      } else {
        // Handle other types of errors
        setError(`An error occurred: ${error.message} `);
      }
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };
  const searchBookTitleHandler = (enteredBookTitle) => {
    console.log("Searching..", enteredBookTitle);
    setSearchQuery(enteredBookTitle);
    fetchBooks(enteredBookTitle)
      // .then((fetchedEditions) => {
      //   if (fetchedEditions?.length == 0) {
      //     console.log("Edition not found");
      //     return;
      //   }
      //   console.log("Edition found", fetchedEditions);
      //   const mappedEditions = fetchedEditions.map((x) => {
      //     let coverUrl;
      //     if (x.isbn_13 && x.isbn_13 > 0) {
      //       const isbn_13 = x.isbn_13[0];
      //       //prepare uri
      //       const key = "isbn";
      //       const value = isbn_13;
      //       const size = "M";
      //       coverUrl = `https://covers.openlibrary.org/b/${key}/${value}-${size}.jpg`;
      //     }
      //     return {
      //       id: x.id,
      //       title: x.title?.slice(0, 20),
      //       publisher: x.publishers[0],
      //       coverUrl: coverUrl,
      //       author: x.authors ? x.authors["name"] : null,
      //     };
      //   });
      //   console.log("mappedEditions", mappedEditions);

      //   setSearchResults(mappedEditions);
      // })
      // .catch((error) => {
      //   console.error("Ne errorru", error);
      // });
  };

  const changeListStatusHandler = (item) => {
    const bookIsInList = isSelectedItem(item.id);

    if (bookIsInList) {
      removeLibraryItemHandler(item.id);
    } else addLibraryItemHandler(item);
  };

  const pressHandler = () => {
    console.log("Selected Library Items");
    navigation.goBack();
  };

  return (
    <Screen>
      <Flex h="100%">
        <Heading p={2}>{i18n.t("keep-exploring")}</Heading>
        <Center w="100%" h="20" px={2}>
          <SearchBar
            onSearchBook={searchBookTitleHandler}
            onFocus={null}
            onScanBarcode={() => {
              navigation.navigate("BarcodeScanner", {
                relatedScreen: mode,
              });
            }}
          />
        </Center>
        <Box>
          {loading && (
            <Box h="75%" alignItems="center" justifyContent="center">
              <LoadingOverlay />
            </Box>
          )}
          {!loading &&
            !error &&
            searchResults?.length > 0 && (
              <>
                <FlatList
                  maxWidth="100%"
                  height="75%"
                  data={searchResults}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => {
                        changeListStatusHandler(item);
                      }}
                    >
                      <Box
                        borderWidth="1"
                        borderRadius="15"
                        borderColor="#F1F1F1"
                        backgroundColor={
                          isSelectedItem(item.id) ? "primary.200" : "white"
                        }
                        p="2"
                        mx="2"
                        my="1"
                      >
                        <HStack
                          justifyContent="space-between"
                          width="100%"
                          space={3}
                          p={1}
                        >
                          <Image
                            source={{ uri: item.coverUrl }}
                            alt="Library"
                            width="25%"
                            roundedRight="6"
                            height="100"
                          />
                          <VStack width="75%">
                            <Text color="#000000" fontSize="16">
                              {item.title}
                            </Text>
                            <Text color="#8c8c8c" fontSize="11">
                              {item.author}
                            </Text>
                            <Text
                              color="#000000"
                              fontSize="13px"
                              mt="1"
                              fontWeight="200"
                            >
                              {item.publisher}
                            </Text>
                            <Spacer></Spacer>
                            <Pressable
                              onPress={() => {
                                {
                                  event.stopPropagation();
                                  navigation.navigate("UserList");
                                }
                              }}
                              borderColor="#323232"
                              borderWidth="0.5"
                              borderRadius="9"
                              p="1"
                              width="90px"
                            >
                              <Text
                                alignSelf="center"
                                color="#323232"
                                fontSize="12px"
                              >
                                999 Owner
                              </Text>
                            </Pressable>
                          </VStack>

                          <Box position="absolute" bottom="0" right="0">
                            <Icon
                              m="2"
                              ml="3"
                              size="6"
                              color={
                                isSelectedItem(item.id)
                                  ? "primary.50"
                                  : "primary.100"
                              }
                              as={
                                <MaterialIcons
                                  name={
                                    isSelectedItem(item.id)
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
                    onPress={pressHandler}
                    right={0}
                    position="absolute"
                  >
                    {i18n.t("done")}
                  </Button>
                </Box>
              </>
            )}
          {searchQuery.length === 0 && (
            <VStack width="100%" height={200} mt="100">
              <Center>
                <Text fontSize="md">{i18n.t("find-favorite-books")}</Text>
              </Center>
              <Center w="100%">
                <Divider mt="3" mb="7" width={300} bg="#EEEEEE" />

                <Text textAlign="center" mx="30" fontWeight="200">
                  {i18n.t("add-books-to-your-lists-to-start-swap")}
                </Text>
              </Center>
            </VStack>
          )}
          {searchResults.length === 0 && searchQuery.length !== 0 && (
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
          {error && (
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
