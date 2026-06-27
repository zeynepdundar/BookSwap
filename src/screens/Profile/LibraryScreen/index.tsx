import { useSelector } from "react-redux";
import { useCallback } from "react";
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
import ScreenHeader from "@/components/ui/ScreenHeader";
import { BookListVertical } from "@/components/ui/BookListVertical";

import { useAppToast } from "@/hooks/useAppToast";
import { useAppDispatch } from "@/store";
import { useNavigationState } from "@react-navigation/native";

import { selectLibraryBooks } from "@/store/selectors";
import { BookCollections, Book } from "@/types/book.types";
import { removeBookFromCollectionAsync } from "@/store/books/thunks";

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

const AddBookToProposalButton = ({ onPress }) => (
  <Icon
    onPress={onPress}
    as={MaterialIcons}
    name="add-circle"
    size="xl"
    color="primary.500"
  />
);

export default function LibraryScreen({ navigation, route }) {
  const dispatch = useAppDispatch();
  const toast = useAppToast();

  const libraryBooks = useSelector(selectLibraryBooks);
  const navigationState = useNavigationState((state) => state);

  const previousRoute =
    navigationState?.routes?.[navigationState.index - 1];

  const showFab = previousRoute?.name === "Profile" ?? false;

  const isTradeProposal =
    route?.params?.data === "SwapOfferProposal";

  const removeBook = useCallback(
    (book: Book) => (
      <RemoveBookButton
        onPress={async () => {
          await dispatch(
            removeBookFromCollectionAsync({
              bookIds: [book.id],
              collection: BookCollections.LIBRARY,
            })
          ).unwrap();

          toast.info(i18n.t("removed-from-list"));
        }}
      />
    ),
    [dispatch, toast]
  );

  const addToProposal = (book: Book) => (
    <AddBookToProposalButton
      onPress={() =>
        navigation.navigate({
          name: "SwapOfferProposal",
          params: { offeredBook: book },
          merge: true,
        } as any)
      }
    />
  );

  const selectedAction = isTradeProposal ? addToProposal : removeBook;

  return (
    <Screen full>
      <ScreenHeader
        title={i18n.t("my-library")}
        onBack={() => navigation.goBack()}
      />

      {/* EMPTY STATE */}
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

            <Text
              fontSize="lg"
              color="gray.900"
              textAlign="center"
              fontFamily="poppins-medium"
            >
              {i18n.t("no-books-in-your-library-yet")}
            </Text>

            <Text
              fontSize="sm"
              color="gray.500"
              textAlign="center"
              lineHeight={20}
              px="8"
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
          onPrimaryAction={selectedAction}
        />
      )}

      {showFab && libraryBooks.length > 0 && (
        <Pressable
          onPress={() =>
            navigation.navigate("BookSearch", {
              sourceScreen: BookCollections.LIBRARY,
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
            <Icon
              as={MaterialIcons}
              name="add"
              color="white"
              size="sm"
            />

            <Text
              ml={2}
              color="white"
              fontFamily="poppins-semi-bold"
            >
              Add
            </Text>
          </Box>
        </Pressable>
      )}
    </Screen>
  );
}