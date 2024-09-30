import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  Button,
  Center,
  Flex,
  Heading,
  ChevronLeftIcon,
  Text,
  Box,
  VStack,
  Spacer,
  HStack,
} from "native-base";
import i18n from "../../i18n";
import Screen from "../../components/Screen";
import SearchBar from "../../components/shared/SearchBar";
import { CoverListHorizontal } from "../../components/shared/CoverListHorizontal";
import { setProfileData } from "../../store/profile-slice";

export default function WishlistInputScreen({ navigation }) {

  const profileData = useSelector((state: any) => state.profile.profile);
  const initialWishlistBooks = profileData.wishlistBook || []; // Assuming wishlistBook contains selected books
  const [selectedBooks, setSelectedBooks] = useState(initialWishlistBooks);


  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const handleAddToWishlist = (data) => {
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

  const handleRemoveFromWishlist = (id) => {
    setSelectedBooks((currentLibraryItems) =>
      currentLibraryItems.filter((item) => item.id !== id)
    );
  };

  const pressHandler = () => {
    dispatch(setProfileData({ wishlistBook: selectedBooks }));
    navigation.navigate("Library");
  };

  return (
    <Screen>
      <VStack space={1} alignItems="center" height={"50%"}>
      <HStack
          alignItems="center"
          space="28%"
          justifyContent="space-between"
          w="100%"
          h="40px"
        >
          <Button
            variant="ghost"
            leftIcon={<ChevronLeftIcon size="6" color="#212325" pr="0" />}
            _pressed={{
              bg: "transparent",
            }}
            onPress={() => navigation.goBack()}
          />
          <Text
            onPress={() => navigation.navigate("Library")}
            color="#969696"
            fontWeight="500"
            fontSize="14px"
            px={4}
          >
            {i18n.t("skip").toUpperCase()}
          </Text>
        </HStack>
        <Spacer></Spacer>
        <Heading w="100%" h="8" px={10}>
          {i18n.t("add-books-to-wishlist")}
        </Heading>
        <Center w="96%" h="20" px={8}>
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
                onAddBook: handleAddToWishlist
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
            <CoverListHorizontal
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
