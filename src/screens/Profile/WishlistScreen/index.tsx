import {
  Center,
  Icon,
  Text,
  VStack,
  Pressable,
  Box,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { selectWishlistBooks } from "@/store/selectors";

import i18n from "@/i18n";
import Screen from "@/components/ui/Screen";
import { BookListVertical } from "@/components/ui/BookListVertical";
import { useAppToast } from "@/hooks/useAppToast";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store";
import { useNavigationState } from "@react-navigation/native";
import { useCallback } from "react";
import { Book, BookCollections } from "@/types/book.types";
import { removeBookFromCollectionAsync } from "@/store/books/thunks";
import ScreenHeader from "@/components/ui/ScreenHeader";

const RemoveBookButton = ({ onPress }) => (
  <Pressable
    onPress={onPress}
    w="9"
    h="9"
    rounded="full"
    alignItems="center"
    justifyContent="center"
    bg="black.900"
    _pressed={{ bg: "primary.100" }}
  >
    <Icon
      name="delete-outline"
      size="md"
      color="black.300"
      as={MaterialIcons}
    />
  </Pressable>
);

export default function WishlistScreen({ navigation }) {
  const dispatch = useAppDispatch();
  const toast = useAppToast();
  const wishlistBooks = useSelector(selectWishlistBooks);
  const navigationState = useNavigationState((state) => state);
  const previousRoute = navigationState?.routes?.[navigationState.index - 1];
  const showFab = previousRoute?.name === "Profile" ?? false;

  const renderRemoveButton = useCallback((book: Book) => (
    <RemoveBookButton
      onPress={async () => {
        await dispatch(
          removeBookFromCollectionAsync({
            bookIds: [book.id],
            collection: BookCollections.WISHLIST,
          })
        ).unwrap();
        toast.info(i18n.t("removed-from-list"));
      }}
    />
  ), [dispatch, toast]);

  return (
<Screen>
  <ScreenHeader
    title={i18n.t("my-wishlist")}
    onBack={() => navigation.goBack()}
  />

  {wishlistBooks.length === 0 && (
    <Center flex={1} px={8}>
      <VStack space={4} alignItems="center">

        <Box
          w="58px"
          h="58px"
          rounded="full"
          bg="coolGray.100"
          alignItems="center"
          justifyContent="center"
        >
          <Icon
            as={MaterialIcons}
            name="bookmark"
            size="lg"
            color="coolGray.400"
          />
        </Box>

        <Text fontSize="18" fontWeight="600" textAlign="center">
          {i18n.t("no-books-in-your-wishlist-yet")}
        </Text>

        <Text
          fontSize="13"
          color="coolGray.500"
          textAlign="center"
          lineHeight={18}
        >
          {i18n.t("add-books-to-your-wishlist-to-swap-books")}
        </Text>

        <Pressable
          onPress={() =>
            navigation.navigate("BookSearch", {
              sourceScreen: BookCollections.WISHLIST,
            })
          }
          mt={4}
        >
          <Box bg="primary.500" px={5} py={3} rounded="full" shadow={4}>
            <Text color="white" fontWeight="600">
              Add books
            </Text>
          </Box>
        </Pressable>

      </VStack>
    </Center>
  )}

  {wishlistBooks.length > 0 && (
    <BookListVertical
      data={wishlistBooks}
      onPrimaryAction={renderRemoveButton}
    />
  )}

  {showFab && wishlistBooks.length > 0 && (
    <Pressable
      onPress={() =>
        navigation.navigate("BookSearch", {
          sourceScreen: BookCollections.WISHLIST,
        })
      }
      position="absolute"
      right={6}
      bottom={10}
    >
      <Box
        flexDirection="row"
        alignItems="center"
        bg="primary.500"
        px={4}
        py={3}
        rounded="full"
        shadow={6}
      >
        <Icon as={MaterialIcons} name="add" color="white" size="sm" />
        <Text ml={2} color="white" fontWeight="600">
          Add
        </Text>
      </Box>
    </Pressable>
  )}
</Screen>
  );
}
