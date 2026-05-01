import {
  Center,
  Heading,
  Icon,
  Fab,
  ChevronLeftIcon,
  Button,
  Spacer,
  HStack,
  Text,
  Divider,
  VStack,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import i18n from "@/i18n";
import Screen from "@/components/Screen";
import { BookListVertical } from "@/components/shared/BookListVertical";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { useNavigationState } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import { LIBRARY } from "@/constants";
import { removeBookFromListAsync } from "@/store/profile/profile-actions";

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
  const navigationState = useNavigationState((state) => state);


  const { params } = route;
  const isTradeProposal = params?.data === "TradeProposal";
  const addBookToProposalButton = (book) => (
    <AddBookToProposalButton
      onPress={() => {        
        navigation.navigate({
          name: "TradeProposal",
          params: { offeredBook: book },
          merge: true,
        } as any);
      }}
    />
  );
  const { libraryBook } = useSelector((state: any) => state.profile.profile);

  const dispatch = useDispatch<AppDispatch>();

  const [selectedBooks, setSelectedBooks] = useState(libraryBook);

  const previousRoute = navigationState?.routes?.[navigationState.index - 1];
  const showFab =  previousRoute?.name === "Profile" ?? false;

  useEffect(() => {
    return () => {
      // Cleanup or additional actions when the component is unmounted
      // Make your API call to update user libraryBook here
      // For example, you can dispatch an action to update the libraryBook in Redux
      // dispatch(updateLibraryBookAsync(selectedBooks));
    };
  }, [dispatch, selectedBooks]);

  const removeBookButton = (book) => (
    <RemoveBookButton
      onPress={() =>
        dispatch(removeBookFromListAsync({ ...book, type: LIBRARY }))
      }
    />
  );
  const selectedBooksAction = isTradeProposal ? addBookToProposalButton : removeBookButton;

  const handleAddToLibrary = (books) => {
    setSelectedBooks((prevList) => [...prevList, ...books]);
  };


  useEffect(() => {
    // Update the local state when libraryBook changes
    setSelectedBooks(libraryBook);
  }, [libraryBook]);

  return (
    <Screen>
      <HStack
        alignItems="center"
        space="20%"
        justifyContent="space-between"
        w="100%"
        h="50px"
>        
        <Button
          variant="ghost"
          leftIcon={<ChevronLeftIcon size="6" color="#212325" pr="0" />}
          _pressed={{
            bg: "transparent",
          }}
          onPress={() => navigation.goBack()}
        />
        <Heading>{i18n.t("my-library")}</Heading>
        <Spacer></Spacer>
      </HStack>
      {selectedBooks.length === 0 && (
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

      {selectedBooks.length > 0 && (
          <BookListVertical
            data={selectedBooks}
            onPrimaryAction={selectedBooksAction}
          />
      )}
      {showFab && (
        <Fab
          // onPress={() =>
          //   navigation.navigate('BookSearch', {
          //     relatedScreen: 'Library',
          //   })
          // }
          onPress={() =>
            navigation.navigate("BookSearch", {
              relatedScreen: "Library",
              // onDonePress: handleAddToLibrary,
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
