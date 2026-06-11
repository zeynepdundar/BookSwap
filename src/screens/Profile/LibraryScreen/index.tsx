import {
  Center,
  Icon,
  Fab,
  Text,
  Divider,
  VStack,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import i18n from "@/i18n";
import Screen from "@/components/shared/Screen";
import { BookListVertical } from "@/components/shared/BookListVertical";
import { useSelector } from "react-redux";
import { selectLibraryBooks } from "@/store/selectors";
import { useAppDispatch } from "@/store";
import { useNavigationState } from "@react-navigation/native";
import { BookCollections } from "@/types/book.types";
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
      onPress={() =>
        dispatch(removeBookFromCollectionAsync({ bookIds: [book.id], collection: BookCollections.LIBRARY }))
      }
    />
  );
  const selectedBooksAction = isTradeProposal ? addBookToProposalButton : removeBookButton;

  return (
    <Screen>
      <ScreenHeader
        title={i18n.t("my-library")}
        onBack={() => navigation.goBack()}
      />
      {libraryBooks.length === 0 && (
        <VStack width="100%" height={200} mt="100">
          <Center>
            <Icon
              name={"bookmark"}
              color="primary.100"
              variant="solid"
              size="lg"
              as={MaterialIcons}
            />

            <Text fontSize="md">{i18n.t("no-books-in-your-library-yet")}</Text>
          </Center>
          <Center w="100%">
            <Divider mt="3" mb="7" width={300} bg="#EEEEEE" />

            <Text textAlign="center" mx="30" fontWeight="200">
              {i18n.t("add-books-to-your-library-to-swap-books")}
            </Text>
          </Center>
        </VStack>
      )}

      {libraryBooks.length > 0 && (
        <BookListVertical
          data={libraryBooks}
          onPrimaryAction={selectedBooksAction}
        />
      )}
      {showFab && (
        <Fab
          onPress={() =>
            navigation.navigate("BookSearch", {
              sourceScreen: BookCollections.LIBRARY,
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
