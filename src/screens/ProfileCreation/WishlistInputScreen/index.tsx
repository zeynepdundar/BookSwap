import { useSelector } from "react-redux";
import {
  Button,
  Center,
  Heading,
  VStack,
  Spacer,
} from "native-base";


import { useAppDispatch } from "@/hooks/common/useAppDispatch";
import i18n from "@/i18n";
import Screen from "@/components/shared/Screen";
import { CoverListHorizontal } from "@/components/shared/CoverListHorizontal";
import StepHeader from "@/components/shared/StepHeader";
import SearchBar from "@/components/shared/SearchBar";
import { removeFromOnboardingWishlist } from "@/store/onboarding/slice";
import { BookCollections } from "@/types/book.types";
import { selectOnboardingWishlistBooks } from "@/store/selectors";

export default function WishlistInputScreen({ navigation }) {
  const dispatch = useAppDispatch();

  const wishlistBooks = useSelector(
    selectOnboardingWishlistBooks
  );

  const handleRemoveFromWishlist = (id: string) => {
    dispatch(removeFromOnboardingWishlist(id));
  };

  const pressHandler = () => {
    navigation.navigate("LibraryInput");
  };

  return (
    <Screen>
      <VStack space={1} alignItems="center" height={"50%"}>

        <StepHeader
          onBack={() => navigation.goBack()}
          onSkip={() => navigation.navigate("LibraryInput")}
        />

        <Spacer />

        <Heading w="100%" h="8" px={10}>
          {i18n.t("add-books-to-wishlist")}
        </Heading>

        <Center w="96%" h="20" px={8}>
          <SearchBar
            onSearchPress={() => {
              navigation.navigate("BookSearchOnCreation", {
                sourceScreen: BookCollections.WISHLIST,
              });
            }}
            onScanPress={() => {
              navigation.navigate("BarcodeScannerOnProfileCreation", {
                sourceScreen: BookCollections.WISHLIST,
              });
            }}
            onFocus={() => {
              navigation.navigate("BookSearchOnCreation", {
                sourceScreen: BookCollections.WISHLIST,
              });
            }}
            disableKeyboard={true}
            navigateOnPress={() =>
              navigation.navigate("BookSearchOnCreation", {
                sourceScreen: BookCollections.WISHLIST
              })
            }
          />
        </Center>

        {wishlistBooks.length > 0 && (
          <Center w="100%" px={6}>
            <CoverListHorizontal
              data={wishlistBooks}
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