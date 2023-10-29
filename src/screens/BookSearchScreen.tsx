import { useEffect, useState } from "react";
import {
  Button,
  Center,
  Heading,
  SearchIcon,
  Input,
  Image,
  FlatList,
  Box,
  Text,
  VStack,
  HStack,
  Flex,
  AspectRatio,
  Pressable,
} from "native-base";
import i18n from "../i18n";
import Screen from "../components/Screen";
import SearchBar from "../components/shared/SearchBar";
import { listEditions } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

export default function BookSearchScreen({ navigation }) {
  const importUrl = require("../assets/images/cover_1.png");
  const wishlistIcon = require("../assets/images/icon/add-wishlist.png");
  const libraryIcon = require("../assets/images/icon/add-library.png");

  const [editions, updateEditions] = useState([]);

  const [libraryItems, setLibraryItem] = useState<any>([]);

  useEffect(() => {
    let fetchedEditions = [];
    const fetchEditions = async () => {
      const editionData = await API.graphql(graphqlOperation(listEditions));
      fetchedEditions = editionData.data.listEditions.items;
    };
    fetchEditions()
      .then(() => {
        const mappedEditions = fetchedEditions.map((x) => ({
          id: x.id,
          title: x.title.slice(0, 20),
          publisher: x.publishers[0],
          coverUrl: importUrl,
          author: "Zeynep Dündar",
        }));
        updateEditions(mappedEditions);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [editions]);

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

  const pressHandler = () => {
    navigation.navigate("Wishlist");
  };

  return (
    <Screen>
      <Flex direction="column">
        <Heading mt="9">{i18n.t("keep-exploring")}</Heading>
        {/* <SearchBar></SearchBar> */}
        <Center>
          <Input
            placeholder={i18n.t("search-by-title")}
            width="90%"
            borderRadius="6"
            borderColor="black.900"
            color="black.400"
            backgroundColor="black.800"
            m="4"
            py="3"
            fontSize="14"
            _focus={{
              borderColor: "black.700",
            }}
            onFocus={() => {}}
            InputLeftElement={<SearchIcon size="5" ml="3" color="black.300" />}
          />
          <FlatList
            maxWidth="100%"
            height="540px"
            data={editions}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  isSelectedItem(item.id)
                    ? removeLibraryItemHandler(item.id)
                    : addLibraryItemHandler(item);
                }}
              >
                <Box
                  borderWidth="1"
                  borderRadius="15"
                  borderColor="#F1F1F1"
                  backgroundColor={
                    isSelectedItem(item.id) ? "primary.200" : "white"
                  }
                  p="3"
                  m="2"
                >
                  <HStack
                    justifyContent="space-between"
                    width="100%"
                    space={3}
                    p={2}
                  >
                    <Image
                      source={importUrl}
                      alt="Library"
                      width="25%"
                      height="100"
                    />
                    <VStack width="75%">
                      <Text color="#000000">{item.title}</Text>
                      <Text color="#8c8c8c" fontSize="xs" p={0}>
                        {item.author}
                      </Text>
                      <Text color="#8c8c8c" fontSize="9px">
                        {item.publisher}
                      </Text>
                    </VStack>

                    <Box position="absolute" bottom="5" right="5">
                      <AspectRatio w="100%" ratio={16 / 9}>
                        {isSelectedItem(item.id) ? (
                          <Image source={libraryIcon} alt="Library" />
                        ) : (
                          <Image source={wishlistIcon} alt="Wishlist" />
                        )}
                      </AspectRatio>
                    </Box>
                  </HStack>
                </Box>
              </Pressable>
            )}
            keyExtractor={(item) => item.id}
          />
        </Center>
        <Box alignItems="center">
          <Button
            variant="outline"
            onPress={pressHandler}
            my={4}
            position="absolute"
            right={2}
          >
            {i18n.t("done")}
          </Button>
        </Box>
      </Flex>
    </Screen>
  );
}
