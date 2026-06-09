import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  HStack,
  VStack,
  Text,
  Icon,
  Box,
  AspectRatio,
  Pressable,
  Button,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import i18n from "@/i18n";
import { Keyboard } from "react-native";
import { formatText, truncateText } from "@/utils/helper";
import { Book } from "@/types/book.types";

interface BorderedBookListVerticalProps {
  data: any[]; // Replace YourItemType with the actual type of your data items
  onDonePress?: (item: any) => void;
}
const ListRow = React.memo(function ListRow({ item, changeListStatusHandler, isSelectedBook }: any) {
    console.log("jhb",item)
  return (
    <Pressable key={item.id} onPress={() => changeListStatusHandler(item)}>
      <Box
        borderWidth="1"
        borderRadius="15"
        height="130"
        borderColor="#F1F1F1"
        backgroundColor={isSelectedBook(item.id) ? "primary.200" : "white"}
        p="3"
        mx="2"
        my="1"
        overflow="hidden"
      >
        <HStack justifyContent="space-between" width="100%" space={3} p={1}>
          <AspectRatio w="20%" ratio={{ base: 40 / 62 }}>
            <Image
              source={
                item.coverUrl
                  ? { uri: item.coverUrl }
                  : {
                    uri: "https://lightning.od-cdn.com/static/img/no-cover_en_US.a8920a302274ea37cfaecb7cf318890e.jpg",
                  }
              }
              alt={`Cover of ${item.title} by ${item.author}`}
              roundedRight="4"
            />
          </AspectRatio>

          <VStack width="75%" h="95">
            <Text color="#000000" fontSize="15" numberOfLines={2} lineHeight="18">
              {truncateText(formatText(item.title), 60)}
            </Text>
            <Text color="#8c8c8c" fontSize="11">
              {truncateText(formatText(item.author), 40)}
            </Text>
            <Text color="#000000" fontSize="13px" fontWeight="200">
              {truncateText(formatText(item.publisher), 26)}
            </Text>
          </VStack>

          <Box position="absolute" bottom="0" right="0">
            <Icon
              m="1"
              size="6"
              color={isSelectedBook(item.id) ? "primary.50" : "primary.100"}
              as={
                <MaterialIcons
                  name={isSelectedBook(item.id) ? "bookmark" : "bookmark-outline"}
                />
              }
            />
          </Box>
        </HStack>
      </Box>
    </Pressable>
  );
});

const keyExtractor = (item) => item.id;
export const BorderedBookListVertical: React.FC<
  BorderedBookListVerticalProps
> = ({ data, onDonePress, ...props }) => {
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  const handleDonePress = () => {
    onDonePress({
      books: selectedBooks,
    });
  };
  const addBookToCollectionsHandler = (selectedItem: Book) => {
    setSelectedBooks((currentLibraryItems) => [
      ...currentLibraryItems,
      {
        id: selectedItem?.id,
        title: selectedItem.title,
        author: selectedItem.author,
        publisher: selectedItem.publisher,
        coverUrl: selectedItem.coverUrl,
      },
    ]);
  };

  // const addBookToCollectionsHandler = (selectedItem: any) => {
  //   if (selectedItem.type === "wishlist")
  //     dispatch(addBookToWishlistAsync(selectedItem));
  //   else if (selectedItem.type === "library")
  //     dispatch(addBookToLibraryAsync(selectedItem));
  // };

  const removeBookFromCollectionHandler = (id) => {
    setSelectedBooks((currentLibraryItems) =>
      currentLibraryItems.filter((item) => item.id !== id)
    );
  };
  const changeListStatusHandler = (item) => {
    const bookIsInList = isSelectedBook(item.id);

    if (bookIsInList) {
      removeBookFromCollectionHandler(item.id);
    } else {
      addBookToCollectionsHandler(item);
    }
  };

  const isSelectedBook = (id: string) => {
    const existingLibraryItemIndex = selectedBooks.findIndex(
      (item) => item.id === id
    );
    return existingLibraryItemIndex !== -1;
  };

  useEffect(() => {
    if (selectedBooks && selectedBooks.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [selectedBooks]);

  return (
    <>
      <FlatList
        maxWidth="100%"
        height="94%"
        mx="3"
        data={data}
        keyExtractor={keyExtractor}
        extraData={data}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={Keyboard.dismiss}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <ListRow
            item={item}
            changeListStatusHandler={changeListStatusHandler}
            isSelectedBook={isSelectedBook}
          />
        )}
        windowSize={7}
        removeClippedSubviews
      />
      <Box alignItems="center" h="20" mx="2">
        <Button
          variant={isButtonDisabled ? "disabledOutline" : "outline"}
          isDisabled={isButtonDisabled}
          onPress={handleDonePress}
          right={0}
          top="2"
          position="absolute"
        >
          {i18n.t("done")}
        </Button>
      </Box>
    </>
  );
};
