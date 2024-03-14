import { useEffect, useRef, useState } from "react";
import {
  Heading,
  Box,
  Text,
  VStack,
  Flex,
  WarningTwoIcon,
  Center,
  Icon,
  Divider,
  Input,
} from "native-base";

import { MaterialIcons } from "@expo/vector-icons";
import Screen from "../components/Screen";
import i18n from "../i18n";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { BookListVertical } from "../components/shared/BookListVertical";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchBooksByTitle } from "../api/service";
import { addBookToListAsync } from "../store/profile-actions";
import {
  getFocusedRouteNameFromRoute,
  useNavigationState,
} from "@react-navigation/native";
import { BorderedBookListVertical } from "../components/shared/BorderedBookListVertical";

export default function BookSearchScreen({ navigation, route = null }) {
  const { relatedScreen, onDonePress } = route.params;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [listType, setListType] = useState<string>("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);

  const dispatch = useDispatch<AppDispatch>();
  const addBookToListHandler = (selectedItem: any) => {
    dispatch(addBookToListAsync(selectedItem));
  };

  const pressDoneHandler = (selectedItem: any) => {
    dispatch(addBookToListAsync(selectedItem));
    navigation.goBack();
  };
  const navigateUserList = (item) => {
    navigation.navigate("UserList", {
      data: item,
    });
  };
  const navigationState = useNavigationState((state) => state);

  const fetchBooks = async (title) => {
    fetchBooksByTitle(title)
      .then((books) => {
        setSearchResults(books);
        setError(null);
      })
      .catch((err) => {
        setError(err);
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
    const type = getFocusedRouteNameFromRoute(
      navigationState.routes[navigationState.index - 1]
    )?.toLocaleUpperCase();
    setListType(type);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 3) {
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
                  secondaryAction={addBookToListHandler}
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
          {!error && searchResults.length === 0 && searchQuery.length > 3 && (
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
