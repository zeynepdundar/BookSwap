import { useState } from "react";
import {
  FlatList,
  Image,
  HStack,
  VStack,
  Text,
  Spacer,
  Icon,
  Box,
  AspectRatio,
  Pressable,
  Button,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { LIBRARY, WISHLIST, ListTypes } from "../../store/profile-slice";
import i18n from "../../i18n";
import { formatText } from "../../utils/helper";

interface BorderedBookListVerticalProps {
  data: any[]; // Replace YourItemType with the actual type of your data items
  onDonePress?: (item: any) => void;
  listType?: string;
}
export const BorderedBookListVertical: React.FC<
  BorderedBookListVerticalProps
> = ({ data, onDonePress, listType, ...props }) => {
  const [selectedBooks, setSelectedBooks] = useState([]);

  const importUrl = require("../../assets/images/no-cover-available.png");

  const handleDonePress = () => {
    // Pass selected items to the parent using the callback
    onDonePress(selectedBooks);
  };
  const addBookToListHandler = (selectedItem: any) => {
    setSelectedBooks((currentLibraryItems) => [
      ...currentLibraryItems,
      {
        type: listType,
        id: selectedItem?.id,
        title: selectedItem.title,
        author: selectedItem.author,
        publisher: selectedItem.publisher,
        coverUrl: selectedItem.coverUrl,
      },
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
  const changeListStatusHandler = (item) => {
    const bookIsInList = isSelectedBook(item.id);

    if (bookIsInList) {
      removeBookFromListHandler(item.id);
    } else {
      addBookToListHandler(item);
    }
  };

  const isSelectedBook = (id: string) => {
    const existingLibraryItemIndex = selectedBooks.findIndex(
      (item) => item.id === id
    );
    return existingLibraryItemIndex !== -1;
  };

  return (
    <>
      <FlatList
        maxWidth="100%"
        height="75%"
        mx="3"
        data={data}
        showsVerticalScrollIndicator={false}
        extraData={data}
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
                    source={item.coverUrl ? { uri: item?.coverUrl } : importUrl}
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
                  <Text color="#000000" fontSize="13px" fontWeight="200">
                    {formatText(item.publisher)}
                  </Text>
                </VStack>
                <Box position="absolute" bottom="0" right="0">
                  <Icon
                    m="1"
                    size="6"
                    color={
                      isSelectedBook(item.id) ? "primary.50" : "primary.100"
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
  );
};
