import * as Localization from "expo-localization";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/hooks/common/useAppDispatch";
import {
  Button,
  Center,
  Heading,
  VStack,
  Box,
} from "native-base";
import i18n from "@/i18n";
import Screen from "@/components/ui/Screen";
import { CoverListHorizontal } from "@/components/ui/CoverListHorizontal";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import StepHeader from "@/components/ui/StepHeader";
import { setIsNewUser } from "@/store/auth/slice";
import { fetchUserProfileAsync } from "@/store/profile/thunks";
import { selectOnboardingLibraryBooks } from "@/store/selectors";
import { BookCollections } from "@/types/book.types";
import { removeFromOnboardingLibrary, resetOnboarding, setOnboardingLanguage } from "@/store/onboarding/slice";
import { RootState } from "@/store/types";
import { completeOnboardingAsync } from "@/store/onboarding/thunks";
import { HomeSearchWidget } from "@/components/ui/HomeSearchWidget";


export default function LibraryInputScreen({ navigation }) {

  const dispatch = useAppDispatch();

  const libraryBooks = useSelector(selectOnboardingLibraryBooks);

  const { loading: authLoading, user } = useSelector(
    (state: RootState) => state.auth
  );


  const deviceLanguage = Localization.getLocales()[0]?.languageCode ?? "en";


  const handleRemoveFromLibrary = (id) => {
    dispatch(removeFromOnboardingLibrary(id));
  };
  const handleProfileUpdate = async (
    specificAction: "pressContinue" | "pressSkip"
  ) => {
    try {
      dispatch(setOnboardingLanguage(deviceLanguage));

      await dispatch(completeOnboardingAsync()).unwrap();
      await dispatch(fetchUserProfileAsync(user.firebaseUserId)).unwrap();
      dispatch(resetOnboarding());
      dispatch(setIsNewUser(false));

    } catch (error) {
      console.log("Profile update failed:", error);
    }
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
      <Box w="100%" pt="2">
        <StepHeader
          onBack={() => navigation.goBack()}
          onSkip={pressSkipHandler}
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
            {i18n.t("add-to-library")}
          </Heading>

          <HomeSearchWidget
            navigation={navigation}
            sourceScreen={BookCollections.LIBRARY}
            isHome={false}
          />
        </VStack>

        {libraryBooks.length > 0 && (
          <Box maxH="40" w="100%" justifyContent="center" alignItems="center">
            <CoverListHorizontal
              data={libraryBooks}
              removeBook={handleRemoveFromLibrary}
            />
          </Box>
        )}

        <Center w="100%" pt="4">
          <Button
            variant="primary"
            onPress={pressContinueHandler}
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
