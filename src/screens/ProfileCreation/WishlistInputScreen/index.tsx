import { useSelector } from "react-redux";
import {
  Button,
  Center,
  Heading,
  VStack,
  Box,
} from "native-base";

import { useAppDispatch } from "@/hooks/common/useAppDispatch";
import i18n from "@/i18n";
import Screen from "@/components/ui/Screen";
import { CoverListHorizontal } from "@/components/ui/CoverListHorizontal";
import StepHeader from "@/components/ui/StepHeader";
import { removeFromOnboardingWishlist } from "@/store/onboarding/slice";
import { selectOnboardingWishlistBooks } from "@/store/selectors";
import { HomeSearchWidget } from "@/components/ui/HomeSearchWidget";
import { BookCollections } from "@/types/book.types";

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
      <Box w="100%" pt="2">
        <StepHeader
          onBack={() => navigation.goBack()}
          onSkip={() => navigation.navigate("LibraryInput")}
        />
      </Box>

      <VStack
        flex={1}
        justifyContent="flex-start"
        pt="10"
        px={6}
        pb="10"
        space={6}
        width="100%"
      >
        <VStack space={3} width="100%">
          <Heading>
            {i18n.t("add-books-to-wishlist")}
          </Heading>

          <HomeSearchWidget
            navigation={navigation}
            sourceScreen={BookCollections.WISHLIST}
            isHome={false}
          />
        </VStack>

        {wishlistBooks.length > 0 && (
          <Box maxH="40" w="100%" justifyContent="center" alignItems="center">
            <CoverListHorizontal
              data={wishlistBooks}
              removeBook={handleRemoveFromWishlist}
            />
          </Box>
        )}

        <Center w="100%" pt="4">
          <Button
            variant="primary"
            onPress={pressHandler}
            w={{ base: "250", lg: "200" }}
            h="12"
            borderRadius="16"
          >
            {i18n.t("continue")}
          </Button>
        </Center>
      </VStack>
    </Screen>
  );
}