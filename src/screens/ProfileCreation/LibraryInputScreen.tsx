import { useEffect, useState } from "react";
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
import { CoverListHorizontal } from "../../components/shared/CoverListHorizontal";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { setIsNewUser } from "../../store/auth-slice";
import * as Localization from "expo-localization";
import { updateProfileAsync } from "../../store/profile-actions";

export default function LibraryInputScreen({ navigation }) {
  const [selectedBooks, setSelectedBooks] = useState([]);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { loading: authLoading } = useSelector((state: any) => state.auth);
  const { profile } = useSelector((state: any) => state.profile);

  const deviceLanguage = Localization.locale.split("-")[0];

  const handleAddToLibrary = (data) => {
    setSelectedBooks((prevSelectedBooks) => {
      const newItemIds = data.map((item) => item.id);
      const filteredData = data.filter(
        (item) =>
          !prevSelectedBooks.some((selectedItem) => selectedItem.id === item.id)
      );
      const updatedSelectedBooks = [...prevSelectedBooks, ...filteredData];
      return updatedSelectedBooks;
    });
  };

  const handleRemoveFromLibrary = (id) => {
    setSelectedBooks((currentLibraryItems) =>
      currentLibraryItems.filter((item) => item.id !== id)
    );
  };
  const handleProfileUpdate = async(specificAction) => {
    if (specificAction === "pressContinue") {
      const updatedProfile = {
        ...profile,
        libraryBook: selectedBooks,
        languagePreference: deviceLanguage,
      };
      dispatch(updateProfileAsync({ profileData: updatedProfile, fullUpdate: true }));
    }
    dispatch(setIsNewUser(false));
  };


  const pressContinueHandler = () => {
    handleProfileUpdate("pressContinue");
  };

  const pressSkipHandler = () => {
    handleProfileUpdate("pressSkip");
  };

  if (authLoading) {
    // We haven't finished checking for the token yet
    return <LoadingOverlay></LoadingOverlay>;
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
                onPress={pressSkipHandler}
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
                onAddBook: handleAddToLibrary

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
            <CoverListHorizontal
              data={selectedBooks}
              removeBook={handleRemoveFromLibrary}
            />
          </Center>
        )}
        <Spacer />
        <Center p={4}>
          <Button variant="primary" onPress={pressContinueHandler}>
            {i18n.t("continue")}
          </Button>
        </Center>
      </VStack>
    </Screen>
  );
}
