import { useState } from "react";
import {
  Button,
  Center,
  Flex,
  Heading,
  ArrowBackIcon,
  Text,
  Box,
  VStack,
  Spacer,
} from "native-base";
import i18n from "../../i18n";
import Screen from "../../components/Screen";
import SearchBar from "../../components/shared/SearchBar";
import { HorizontalCoverList } from "../../components/shared/HorizontalCoverList";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { setProfileData } from "../../store/profile-slice";
import { updateUserProfileAsync } from "../../store/profile-actions";
import { LoadingOverlay } from "../../components/LoadingOverlay";


export default function LibraryInputScreen({ navigation }) {
  const [selectedBooks, setSelectedBooks] = useState([]);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { profile, loading } = useSelector((state: any) => state.profile);

  const handleAddToLibrary = (data) => {
    setSelectedBooks(data);
  };

  const handleRemoveFromLibrary = (id) => {
    setSelectedBooks((currentLibraryItems) =>
      currentLibraryItems.filter((item) => item.id !== id)
    );
  };
  const pressHandler = () => {
    console.log(selectedBooks);
    const idsArray = selectedBooks.map((item) => item.id);
    dispatch(setProfileData({ libraryBookIds: idsArray }));
    console.log("Library",profile)
    dispatch(updateUserProfileAsync(profile));
    console.log(profile, loading);
  };
  if (loading) {
    // We haven't finished checking for the token yet
    return <LoadingOverlay></LoadingOverlay>
  }
  return (
    <Screen>
      <VStack space={1} alignItems="center" height={"50%"}>
        <Center w="100%" h="20" justifyContent="space-between">
          <Flex direction="row" justifyContent="space-between" w="100%" h="10">
            <Button
              backgroundColor="transparent"
              variant="ghost"
              leftIcon={<ArrowBackIcon size="6" color="#212325" pr="0" />}
              _pressed={{
                bg: "transparent",
              }}
              onPress={() => navigation.goBack()}
            ></Button>
            <Box justifyContent="center">
              <Text
                onPress={() => navigation.navigate("Library")}
                color="#969696"
                fontWeight="500"
                fontSize="14px"
                px={4}
              >
                {i18n.t("skip").toUpperCase()}
              </Text>
            </Box>
          </Flex>
        </Center>
        <Heading w="100%" h="8" px={6}>
          {i18n.t("add-books-to-library")}
        </Heading>
        <Center w="100%" h="20" px={8}>
          <SearchBar
            onSearchBook={() => {
              navigation.navigate("BookSearchOnCreation", {
                relatedScreen: "Library",
                onDonePress: handleAddToLibrary,
              });
            }}
            onScanBarcode={() => {
              navigation.navigate("BarcodeScannerOnProfileCreation", {
                relatedScreen: "Library",
              });
            }}
            onFocus={() => {
              navigation.navigate("BookSearchOnCreation", {
                relatedScreen: "Library",
                onDonePress: handleAddToLibrary,
              });
            }}
          />
        </Center>
        {selectedBooks.length > 0 && (
          <Center w="100%" px={6}>
            <HorizontalCoverList
              data={selectedBooks}
              removeBook={handleRemoveFromLibrary}
            />
          </Center>
        )}
        <Spacer />
        <Center p={4}>
          <Button variant="primary" onPress={pressHandler}>
            {i18n.t("continue")}
          </Button>
        </Center>
      </VStack>
    </Screen>
  );
}
