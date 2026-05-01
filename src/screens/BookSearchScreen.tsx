import { useEffect, useRef, useState } from "react";
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
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Screen from "@/components/Screen";
import i18n from "@/i18n";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { BookListVertical } from "@/components/shared/BookListVertical";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { fetchBooksByTitle } from "@/api/service";
import {
  getFocusedRouteNameFromRoute,
  useNavigationState,
} from "@react-navigation/native";
import { BorderedBookListVertical } from "@/components/shared/BorderedBookListVertical";
import { ErrorAlert } from "./BarcodeScannerScreen";
import { addBookToListAsync } from "@/store/profile/profile-actions";

export default function BookSearchScreen({ navigation, route = null }) {
  const { relatedScreen, onDonePress } = route.params;
  // const { searchedBook } = route.params || {};

  const [loading, setLoading] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [listType, setListType] = useState<string>("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [listError, setListError] = useState<string | null>(null);

  // useEffect(() => {
  //   if (searchedBook) {
  //     setSearchQuery(searchedBook || ""); // Set search query to the book's title
  //   }
  // }, [searchedBook]);

  const dispatch = useDispatch<AppDispatch>();
  const addBookToListHandler = async (selectedItem: any) => {
    Keyboard.dismiss();
    inputRef.current?.blur?.();
    try {
      const response = await dispatch(addBookToListAsync
        (selectedItem));
      const payload = (response as any).payload as {
        status?: string;
        existingEditionIds?: any[];
        message?: string;
      } | undefined;

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

  const pressDoneHandler = async (selectedItem: any) => {
    Keyboard.dismiss();
    inputRef.current?.blur?.();
    let result;

    if (Array.isArray(selectedItem) && selectedItem.length > 0) {
      result = await addBookToListHandler(selectedItem);
    } else {
      result = await addBookToListHandler([selectedItem]);
    }

    if (result.success) {
      navigation.goBack();
    } else {
    }
  };
  const navigateUserList = (item) => {
    const { photo_file_name, ...userWithoutPhoto } = item; // Destructure to omit photo_file_name
    navigation.navigate("UserList", {
      data: userWithoutPhoto, // Pass the user object without the photo_file_name
    });
  };
  const navigationState = useNavigationState((state) => state);

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
  const inputRef = useRef(null);

  // useEffect(() => {
  //   // Focus on the input when the component mounts
  //   console.log("Entering", inputRef.current?._inputElement);
  //   inputRef.current?.inputElement?.focus();
  // }, []);

  useEffect(() => {
    inputRef.current?.focus();
    // Ensure focus after navigation transition (especially Android)
    const focusTimer = setTimeout(() => {
      inputRef.current?.focus?.();
    }, 100);
    const type = getFocusedRouteNameFromRoute(
      navigationState.routes[navigationState.index - 1]
    )?.toLocaleUpperCase();
    setListType(type);
    return () => clearTimeout(focusTimer);
  }, []);


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
      relatedScreen: relatedScreen,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Screen>
        <Box
          w="100%"
          h={9}
          alignItems="flex"
          justifyContent="center" // Aligns text to the left
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
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
          </Center>
          <Box>
            {loading && (
              <Box h="75%" alignItems="center" justifyContent="center">
                <LoadingOverlay />
              </Box>
            )}
            {!loading && !searchError && searchResults?.length > 0 && (
              <>
                {/* For specific book list (wishlist/library) search result*/}
                {listType && listType !== "HOME" ? (
                  <BorderedBookListVertical
                    data={searchResults}
                    onDonePress={pressDoneHandler}
                    listType={listType}
                  />
                ) : (
                  <BookListVertical
                    data={searchResults}
                    onSecondaryAction={addBookToListHandler}
                    onNavigateList={navigateUserList}
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
                    {relatedScreen === "Wishlist"
                      ? i18n.t("add-books-to-your-wishlist-to-start-swap")
                      : i18n.t("add-books-to-your-library-to-start-swap")}
                  </Text>
                </Center>
              </VStack>
            )}
            {!searchError &&
              searchResults.length === 0 &&
              searchQuery.length >= 3 && (
                <VStack width="100%" height={200} mt="100">
                  <Center w="100%">
                    <Text
                      fontSize="md"
                      alignSelf="center"
                      maxWidth={360}
                      textAlign="center"
                    >
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

            {listError && (
              <>
                <ErrorAlert message={listError} />
                {/* <Button onPress={() => setScanned(false)}>Tap to Scan Again</Button> */}
              </>
            )}
          </Box>
        </Flex>
      </Screen>
    </TouchableWithoutFeedback>
  );
}
