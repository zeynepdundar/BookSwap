import { useEffect, useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
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

import Screen from "../../components/Screen";
import i18n from "../../i18n";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { EditionEndpoints } from "../../api/endpoints";
import { BorderedBookListVertical } from "../../components/shared/BorderedBookListVertical";

export default function BookSearchOnCreationScreen({
  navigation,
  route = null,
}) {
  const { relatedScreen, onDonePress } = route.params;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchBooks = async (title) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        EditionEndpoints.FETCH_EDITION_BY_TITLE(title)
      );

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
            ? EditionEndpoints.FETCH_COVER_OL(undefined, item.isbn_13)
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
    navigation.navigate("BarcodeScannerOnProfileCreation", {
      relatedScreen: "Library",
    });
  };

  const pressDoneHandler = async (selectedItem: any) => {
    onDonePress(selectedItem);
    navigation.goBack();
  };

  return (
    <Screen>
      <Flex h="80%">
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
            <BorderedBookListVertical
              data={searchResults}
              onDonePress={pressDoneHandler}
              listType={relatedScreen}
            />
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
          {error && searchQuery?.length > 4 && (
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
