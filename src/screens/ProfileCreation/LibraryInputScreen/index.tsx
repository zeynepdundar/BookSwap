import { useState } from "react";
import * as Localization from "expo-localization";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  Button,
  Center,
  Heading,
  VStack,
  Spacer,
} from "native-base";
import i18n from "@/i18n";
import Screen from "@/components/shared/Screen";
import SearchBar from "@/components/shared/SearchBar";
import { CoverListHorizontal } from "@/components/shared/CoverListHorizontal";
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import StepHeader from "@/components/shared/StepHeader";
import { setIsNewUser } from "@/store/auth/slice";
import { updateProfileAsync } from "@/store/profile/thunks";


export default function LibraryInputScreen({ navigation }) {
  const [selectedBooks, setSelectedBooks] = useState([]);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { loading: authLoading } = useSelector((state: any) => state.auth);
  const { profile } = useSelector((state: any) => state.profile);

  const deviceLanguage = Localization.getLocales()[0]?.languageCode ?? "en";

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
  const handleProfileUpdate = async (specificAction) => {
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

        <StepHeader
          onBack={() => navigation.goBack()}
          onSkip={pressSkipHandler}
        />
        <Spacer></Spacer>
        <Heading w="100%" h="8" px={10}>
          {i18n.t("add-books-to-library")}
        </Heading>
        <Center w="96%" h="20" px={8}>
          <SearchBar
            onSearchBook={() => {
              navigation.navigate("BookSearchOnCreation", {
                sourceScreen: "Library",
                onDonePress: handleAddToLibrary,
              });
            }}
            onScanBarcode={() => {
              navigation.navigate("BarcodeScannerOnProfileCreation", {
                sourceScreen: "Library",
                onAddBook: handleAddToLibrary

              });
            }}
            onFocus={() => {
              navigation.navigate("BookSearchOnCreation", {
                sourceScreen: "Library",
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
