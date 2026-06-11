import {
  Center,
  Icon,
  Fab,
  Text,
  Divider,
  VStack,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { selectWishlistBooks } from "@/store/selectors";

import i18n from "@/i18n";
import Screen from "@/components/shared/Screen";
import { BookListVertical } from "@/components/shared/BookListVertical";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store";
import { useNavigationState } from "@react-navigation/native";
import { useCallback } from "react";
import { Book, BookCollections } from "@/types/book.types";
import { removeBookFromCollectionAsync } from "@/store/books/thunks";
import ScreenHeader from "@/components/shared/ScreenHeader";

const RemoveBookButton = ({ onPress }) => (
  <Icon
    onPress={onPress}
    name={"delete-forever"}
    variant="solid"
    size="lg"
    color="primary.100"
    as={MaterialIcons}
  />
);

export default function WishlistScreen({ navigation }) {
  const dispatch = useAppDispatch();
  const wishlistBooks = useSelector(selectWishlistBooks);
  const navigationState = useNavigationState((state) => state);
  const previousRoute = navigationState?.routes?.[navigationState.index - 1];
  const showFab = previousRoute?.name === "Profile" ?? false;

  const renderRemoveButton = useCallback((book: Book) => (
    <RemoveBookButton
      onPress={() =>
        dispatch(
          removeBookFromCollectionAsync({
            bookIds: [book.id],
            collection: BookCollections.WISHLIST,
          })
        )
      }
    />
  ), [dispatch]);

  return (
    <Screen>
      <ScreenHeader
        title={i18n.t("my-wishlist")}
        onBack={() => navigation.goBack()}
      />
      {wishlistBooks.length === 0 && (
        <VStack width="100%" height={200} mt="100">
          <Center>
            <Icon
              name={"bookmark"}
              color="primary.100"
              variant="solid"
              size="lg"
              as={MaterialIcons}
            />

            <Text fontSize="md">{i18n.t("no-books-in-your-wishlist-yet")}</Text>
          </Center>
          <Center w="100%">
            <Divider mt="3" mb="7" width={300} bg="#EEEEEE" />

            <Text textAlign="center" mx="30" fontWeight="200">
              {i18n.t("add-books-to-your-wishlist-to-swap-books")}
            </Text>
          </Center>
        </VStack>
      )}

      {wishlistBooks.length > 0 && (
        <BookListVertical
          data={wishlistBooks}
          onPrimaryAction={renderRemoveButton}
        />
      )}
      {showFab && (
        <Fab
          onPress={() =>
            navigation.navigate("BookSearch", {
              sourceScreen: BookCollections.WISHLIST,
            })
          }
          renderInPortal={false}
          shadow={2}
          size="sm"
          bgColor="primary.50"
          right={35}
          bottom={70}
          icon={<Icon color="white" as={MaterialIcons} name="add" size="md" />}
        />
      )}
    </Screen>
  );
}
