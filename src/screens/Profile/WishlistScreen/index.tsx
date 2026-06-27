import {
  Center,
  Icon,
  Text,
  VStack,
  Pressable,
  Box,
  Button,
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
    bg="gray.100"
    _pressed={{ opacity: 0.6 }}
  >
    <Icon
      as={MaterialIcons}
      name="remove-circle-outline"
      size="md"
      color="gray.500"
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
    <Screen full>
      <ScreenHeader
        title={i18n.t("my-wishlist")}
        onBack={() => navigation.goBack()}
      />

      {wishlistBooks.length === 0 && (
        <Center flex={1} px={8}>
          <VStack space={4} alignItems="center">
            <Box
              w="64px"
              h="64px"
              rounded="full"
              bg="primary.50"
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                as={MaterialIcons}
                name="bookmark-outline"
                size="lg"
                color="primary.500"
              />
            </Box>

            <Text
              fontSize="lg"
              color="gray.900"
              textAlign="center"
              fontFamily="poppins-medium"
              >
              {i18n.t("no-books-in-your-wishlist-yet")}
            </Text>

            <Text
              fontSize="sm"
              color="gray.500"
              textAlign="center"
              lineHeight={20}
              px="8"
            >
              {i18n.t("add-books-to-your-wishlist-to-swap-books")}
            </Text>

            <Button
              onPress={() =>
                navigation.navigate("BookSearch", {
                  sourceScreen: BookCollections.WISHLIST,
                })
              }
              variant="primary"
              rounded="full"
              mt={4}
              py={3}
            >
              {i18n.t("add-books")}
            </Button>
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
          _pressed={{ opacity: 0.85 }}
        >
          <Box
            flexDirection="row"
            alignItems="center"
            bg="primary.500"
            px={5}
            py={3}
            rounded="full"
            shadow={3}
          >
            <Icon as={MaterialIcons} name="add" color="white" size="sm" />

            <Text ml={2}  fontFamily="poppins-semi-bold">
              Add
            </Text>
          </Box>
        </Pressable>
      )}
    </Screen>
  );
}
