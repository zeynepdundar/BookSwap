import {
  Center,
  Spacer,
  Image,
  Box,
  Text,
  VStack,
  HStack,
  FlatList,
  AspectRatio,
  Avatar,
  Flex,
  WarningTwoIcon,
} from "native-base";
import i18n from "../../i18n";
import Screen from "../../components/Screen";
import { useState } from "react";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { EditionEndpoints } from "../../api-endpoints";

const data = [
  {
    id: "1",
    senderUserName: "Lalo Salamanca",
    profilPhotoUrl: "../../assets/images/icon/logout-icon.png",
    requestedBookCover: "",
    offeredBookCover: "../../assets/images/cover_2.png",
    requestedBookTitle: "The Path Made Clear",
    offeredBookTitle: "The Path Made Clear",
    acceptedDate: "",
  },
  {
    id: "2",
    senderUserName: "Lalo Salamanca",
    profilPhotoUrl: "../../assets/images/icon/logout-icon.png",
    requestedBookCover: "",
    offeredBookCover: "../../assets/images/cover_2.png",
    requestedBookTitle: "The Path Made Clear",
    offeredBookTitle: "The Path Made Clear",
    acceptedDate: "",
  },
];

export default function HistoryScreen({ navigation }) {
  const tradeIcon = require("../../assets/images/icon/trade-in.png");
  const profilePhoto = require("../../assets/images/lalo-salamanca.png");
  const importUrl = require("../../assets/images/cover_2.png");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [historyList, setHistoryList] = useState<any>(data);

  const fetchHistory = async (title) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        EditionEndpoints.FETCH_EDITION_BY_TITLE(title)
        );

      if (!response.ok) {
        throw new Error(`HTTP request failed with status ${response.status}`);
      }

      console.log("dgsdg", response);

      const data = await response.json();

      if (data === null || data === "") {
        throw new Error("Received null response from the server.");
      }

      console.log("dgsdg", data);

      // const transformedData = data.editions.map((item) => ({
      //   id: item.id,
      //   title: item.title?.slice(0, 20),
      //   publisher: item.publishers[0],
      //   coverUrl:
      //     item.isbn_13 && item.isbn_13 > 0
      //       ? `https://covers.openlibrary.org/b/${"isbn"}/${
      //           item.isbn_13
      //         }-${"M"}.jpg`
      //       : null,
      //   author: item.authors ? item.authors["name"] : null,
      // }));

      // Update searchResults state with the transformed data
      // setSearchResults(transformedData);
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

  return (
    <Screen>
      <Center>
        {loading && (
          <Box h="75%" alignItems="center" justifyContent="center">
            <LoadingOverlay />
          </Box>
        )}
        {!loading && !error && historyList?.length > 0 && (
          <FlatList
            w="100%"
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Box
                p="1.5"
                mb="2"
                borderWidth="1"
                borderRadius="10"
                borderColor="#EEEEEE"
                shadow={0.8}
                overflow="hidden"
              >
                <HStack space="0.8" alignItems="center" h={151}>
                  <VStack w="85px" h={140} alignItems="center" pt={3}>
                    <Image
                      source={importUrl}
                      alt=" Library"
                      width="60"
                      height="82"
                      borderRightRadius={10}
                    />
                    <Text
                      color="#06070D"
                      fontSize="xs"
                      mt="1"
                      textAlign="center"
                    >
                      {item.requestedBookTitle}
                    </Text>
                  </VStack>
                  <Image source={tradeIcon} alt=" Library" />
                  <VStack w="85px" h={140} alignItems="center" pt={3}>
                    <Image
                      source={importUrl}
                      alt=" Library"
                      width="60"
                      height="82"
                      borderRightRadius={10}
                    />
                    <Text
                      color="#06070D"
                      fontSize="xs"
                      mt="1"
                      textAlign="center"
                    >
                      {item.offeredBookTitle}
                    </Text>
                  </VStack>
                  <Spacer></Spacer>
                  <VStack w="102" h={126}>
                    <Text color="#8c8c8c" fontSize="xs" textAlign="right">
                      20 Jun
                    </Text>
                    <Spacer />
                    <Flex direction="column" alignItems="flex-end">
                      <AspectRatio w="39">
                        <Avatar source={profilePhoto} size="31" />
                      </AspectRatio>
                      <Text
                        color="#8c8c8c"
                        fontSize="10"
                        maxW="68px"
                        textAlign="center"
                        pt="1"
                      >
                        with <Text> {item.senderUserName}</Text>
                      </Text>
                    </Flex>
                  </VStack>
                </HStack>
              </Box>
            )}
            keyExtractor={(item) => item.id}
          />
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
      </Center>
    </Screen>
  );
}
