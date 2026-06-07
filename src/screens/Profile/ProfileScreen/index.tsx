import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Center,
  Heading,
  Box,
  Text,
  Pressable,
  Menu,
  VStack,
} from "native-base";
import i18n from "@/i18n";
import Screen from "@/components/shared/Screen";
import ImagePicker from "@/components/shared/ImagePicker";
import { updateProfileAsync } from "@/store/profile";
import { getAuth, signOut as firebaseSignOut } from "@react-native-firebase/auth";
import { clearMessages } from "@/store/messages/messages-slice";
import AsyncStore from "@/utils/AsyncStore";
import ProfileMenuItem from "../components/ProfileMenuItem";
import { AlertDialogBox } from "@/components/Modal/AlertDialogBox";
import { useAppDispatch } from "@/hooks/common/useAppDispatch";
import { selectLibraryBookIds, selectWishlistBookIds } from "@/store/selectors";
import ScreenHeader from "@/components/shared/ScreenHeader";
import { clearOffers } from "@/store/offers/slice";
import { clearBooks } from "@/store/books/slice";
import { signOut } from "@/store/auth/slice";


export default function ProfileScreen({ navigation }) {
  const dispatch = useAppDispatch();
  const libraryIcon = require("@/assets/images/icon/library-icon.png");
  const wishlistIcon = require("@/assets/images/icon/wishlist-icon.png");
  const languageIcon = require("@/assets/images/icon/language-icon.png");
  const feedbackIcon = require("@/assets/images/icon/feedback-icon.png");
  const logoutIcon = require("@/assets/images/icon/logout-icon.png");

  const profileData = useSelector((state: any) => state.profile.profile);
  const wishlistBookIds = useSelector(selectWishlistBookIds);
  const libraryBookIds = useSelector(selectLibraryBookIds);


  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false);

  const {
    name,
    languagePreference,
    imageData,
  } = profileData;



  const handleLanguageChange = (selectedLanguage) => {
    i18n.locale = selectedLanguage;
    console.log("Selected language:", selectedLanguage);

    dispatch(updateProfileAsync({
   
        id: profileData.id,
        languagePreference: selectedLanguage,
    
    }));
  };

  const handleImageUpload = (imageUri) => {

    dispatch(updateProfileAsync({

        id: profileData.id,
        imageData: imageUri,
 
    }));
  };
  const menuItems = [
    {
      key: "wishlist",
      icon: wishlistIcon,
      label: i18n.t("my-wishlist"),
      onPress: () => navigation.navigate("Wishlist"),
      rightContent: (
        <Box rounded="md" px={2} py={0.5} bg="primary.50">
          <Text
            fontSize="sm"
            fontWeight="medium"
            color="warmGray.50"
            letterSpacing="lg"
          >
            {wishlistBookIds?.length ?? 0}
          </Text>
        </Box>
      ),
    },
    {
      key: "library",
      icon: libraryIcon,
      label: i18n.t("my-library"),
      onPress: () => navigation.navigate("Library"),
      rightContent: (
        <Box rounded="md" px={2} py={0.5} bg="primary.50">
          <Text
            fontSize="sm"
            fontWeight="medium"
            color="warmGray.50"
            letterSpacing="lg"
          >
            {libraryBookIds?.length ?? 0}
          </Text>
        </Box>
      ),
    },
    {
      key: "language",
      icon: languageIcon,
      label: i18n.t("language"),
      onPress: () => { },
      rightContent: (
        <Menu
          w="106"
          mr={18}
          trigger={(triggerProps) => (
            <Pressable accessibilityLabel="Language selection" {...triggerProps}>
              <Text
                fontSize="md"
                fontWeight="medium"
                color="black.700"
                letterSpacing="lg"
              >
                {languagePreference?.toUpperCase()}
              </Text>
            </Pressable>
          )}
        >
          {[
            { code: "tr", lang: i18n.t("turkish") },
            { code: "en", lang: i18n.t("english") },
          ].map((input) => (
            <Menu.Item
              key={input.code}
              onPress={() => handleLanguageChange(input.code)}
              disabled={languagePreference === input.code}
            >
              {input.lang}
            </Menu.Item>
          ))}
        </Menu>
      ),
    },
    {
      key: "feedback",
      icon: feedbackIcon,
      label: i18n.t("feedback"),
      onPress: () => navigation.navigate("Feedback"),
    },
    {
      key: "logout",
      icon: logoutIcon,
      label: i18n.t("logout"),
      onPress: () => setIsOpen(true),
    },
  ];

  const signOutHandler = async (): Promise<void> => {
    try {
      dispatch(signOut());
      dispatch(clearMessages());
      dispatch(clearBooks());
      dispatch(clearOffers());

      await firebaseSignOut(getAuth());
      await AsyncStore.removeItem("authToken");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Screen>
      <ScreenHeader
        title={i18n.t("profile")}
        onBack={() => navigation.goBack()}
      />
      <VStack space={1} alignItems="center" height={"50%"}>
        <Center w="100%" h="215px" px={6}>
          <ImagePicker
            selectedImage={handleImageUpload}
            initialImage={imageData}
          />
          <Heading color="black.100" my={3}>
            {name}
          </Heading>
        </Center>


        {menuItems.map(({ key, ...item }) => (
          <ProfileMenuItem
            key={key}
            {...item}
          />
        ))}

        <AlertDialogBox
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={signOutHandler}
          title={i18n.t("logout")}
          description={i18n.t("are-you-sure-log-out")}
          cancelButtonLabel={i18n.t("cancel")}
          confirmButtonLabel={i18n.t("logout")}
        />
      </VStack>
    </Screen>
  );
}
