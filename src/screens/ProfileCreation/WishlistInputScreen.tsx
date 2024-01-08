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
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { setProfileData } from "../../store/profile-slice";

export default function WishlistInputScreen({ navigation }) {
  const [selectedBooks, setSelectedBooks] = useState([]);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();


  const handleAddToWishlist = (data) => {
    setSelectedBooks(data);
  };

  const handleRemoveFromWishlist = (id) => {
    setSelectedBooks((currentLibraryItems) =>
      currentLibraryItems.filter((item) => item.id !== id)
    );
  };

  const pressHandler = () => {
    console.log(selectedBooks);
    const idsArray = selectedBooks.map(item => item.id);
    dispatch(setProfileData({wishlistBookIds:idsArray}));
    navigation.navigate("Library");
  };



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
          {i18n.t("add-books-to-wishlist")}
        </Heading>
        <Center w="100%" h="20" px={8}>
          <SearchBar
            onSearchBook={() => {
              navigation.navigate("BookSearchOnCreation", {
                relatedScreen: "Wishlist",
                onDonePress: handleAddToWishlist,
              });
            }}
            onScanBarcode={() => {
              navigation.navigate("BarcodeScannerOnProfileCreation", {
                relatedScreen: "Wishlist",
              });
            }}
            onFocus={() => {
              navigation.navigate("BookSearchOnCreation", {
                relatedScreen: "Wishlist",
                onDonePress: handleAddToWishlist,
              });
            }}
          />
        </Center>
        {selectedBooks.length > 0 && (
          <Center w="100%" px={6}>
            <HorizontalCoverList
              data={selectedBooks}
              removeBook={handleRemoveFromWishlist}
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
