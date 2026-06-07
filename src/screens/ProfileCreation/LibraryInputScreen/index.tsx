import * as Localization from "expo-localization";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/hooks/common/useAppDispatch";
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
import { fetchUserProfileAsync } from "@/store/profile/thunks";
import { selectOnboardingLibraryBooks } from "@/store/selectors";
import { BookCollections } from "@/types/book.types";
import { removeFromOnboardingLibrary, resetOnboarding, setOnboardingLanguage } from "@/store/onboarding/slice";
import { RootState } from "@/store/types";
import { completeOnboardingAsync } from "@/store/onboarding/thunks";


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
            onSearchPress={() => {
              navigation.navigate("BookSearchOnCreation", {
                sourceScreen: BookCollections.LIBRARY,
              });
            }}
            onScanPress={() => {
              navigation.navigate("BarcodeScannerOnProfileCreation", {
                sourceScreen: BookCollections.LIBRARY,
              });
            }}
            onFocus={() => {
              navigation.navigate("BookSearchOnCreation", {
                sourceScreen: BookCollections.LIBRARY,
              });
            }}
            navigateOnPress={() =>
              navigation.navigate("BookSearchOnCreation", {
                sourceScreen: BookCollections.LIBRARY,
              })
            }
            disableKeyboard={true}
          />
        </Center>
        {libraryBooks.length > 0 && (
          <Center w="100%" px={6}>
            <CoverListHorizontal
              data={libraryBooks}
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
