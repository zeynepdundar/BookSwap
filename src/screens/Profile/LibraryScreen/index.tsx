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

import i18n from "@/i18n";
import Screen from "@/components/ui/Screen";
import { BookListVertical } from "@/components/ui/BookListVertical";
import { useAppToast } from "@/hooks/useAppToast";
import { useSelector } from "react-redux";
import { selectLibraryBooks } from "@/store/selectors";
import { useAppDispatch } from "@/store";
import { useNavigationState } from "@react-navigation/native";
import { BookCollections } from "@/types/book.types";
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
    _pressed={{ bg: "error.500:alpha.10" }}
  >
    <Icon
      name="delete-outline"
      size="md"
      color="black.300"
      as={MaterialIcons}
    />
  </Pressable>
);

const AddBookToProposalButton = ({ onPress }) => (
  <Icon
    onPress={onPress}
    name={"add-circle"}
    variant="solid"
    size="xl"
    color="primary.100"
    as={MaterialIcons}
  />
);

export default function LibraryScreen({ navigation, route }) {
  const dispatch = useAppDispatch();
  const toast = useAppToast();

  const navigationState = useNavigationState((state) => state);

  const libraryBooks = useSelector(selectLibraryBooks);

  const { params } = route;
  const isTradeProposal = params?.data === "SwapOfferProposal";
  const addBookToProposalButton = (book) => (
    <AddBookToProposalButton
      onPress={() => {
        navigation.navigate({
          name: "SwapOfferProposal",
          params: { offeredBook: book },
          merge: true,
        } as any);
      }}
    />
  );

  const previousRoute = navigationState?.routes?.[navigationState.index - 1];
  const showFab = previousRoute?.name === "Profile" ?? false;


  const removeBookButton = (book) => (
    <RemoveBookButton
      onPress={async () => {
        await dispatch(
          removeBookFromCollectionAsync({ bookIds: [book.id], collection: BookCollections.LIBRARY })
        ).unwrap();
        toast.info(i18n.t("removed-from-list"));
      }}
    />
  );
  const selectedBooksAction = isTradeProposal ? addBookToProposalButton : removeBookButton;

  return (
    <Screen full>
      <ScreenHeader
        title={i18n.t("my-library")}
        onBack={() => navigation.goBack()}
      />
      {libraryBooks.length === 0 && (
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
                name="auto-stories"
                size="lg"
                color="primary.500"
              />
            </Box>

            <Text fontSize="18" fontWeight="500" color="#111827" textAlign="center">

              {i18n.t("no-books-in-your-library-yet")}
            </Text>

            <Text
              fontSize="sm"
              color="coolGray.500"
              textAlign="center"
              lineHeight={18}
            >
              {i18n.t("add-books-to-your-library-to-swap-books")}
            </Text>
            <Button
              onPress={() =>
                navigation.navigate("BookSearch", {
                  sourceScreen: BookCollections.LIBRARY,
                })
              }

              variant="primary"
              rounded="full"
              mt={4}
              px={2}
              py={3}
            >
              {i18n.t("add-books")}
            </Button>

          </VStack>
        </Center>
      )}
      {libraryBooks.length > 0 && (
        <BookListVertical
          data={libraryBooks}
          onPrimaryAction={selectedBooksAction}
        />
      )}
      {showFab && libraryBooks.length > 0 &&
        <Pressable
          onPress={() =>
            navigation.navigate("BookSearch", {
              sourceScreen: BookCollections.LIBRARY,
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
            <Icon
              as={MaterialIcons}
              name="add"
              color="white"
              size="sm"
            />
            <Text ml={2} color="white" fontWeight="600">
              Add
            </Text>
          </Box>
        </Pressable>
      }
    </Screen>
  );
}
