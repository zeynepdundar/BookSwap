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
  HStack,
  Icon,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import i18n from "@/i18n";
import Screen from "@/components/ui/Screen";
import ImagePicker from "@/components/ui/ImagePicker";
import { updateProfileAsync } from "@/store/profile";
import { getAuth, signOut as firebaseSignOut } from "@react-native-firebase/auth";
import { clearMessages } from "@/store/messages/messages-slice";
import AsyncStore from "@/utils/AsyncStore";
import ProfileMenuItem from "../components/ProfileMenuItem";
import { AlertDialogBox } from "@/components/Modal/AlertDialogBox";
import { useAppDispatch } from "@/hooks/common/useAppDispatch";
import { selectLibraryBookIds, selectWishlistBookIds } from "@/store/selectors";
import ScreenHeader from "@/components/ui/ScreenHeader";
import { clearOffers } from "@/store/offers/slice";
import { clearBooks } from "@/store/books/slice";
import { signOut } from "@/store/auth/slice";
import { PROFILE_SCREEN_ICONS } from "@/constants/image";


export default function ProfileScreen({ navigation }) {
  const dispatch = useAppDispatch();

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
      icon: "bookmark-outline",
      label: i18n.t("my-wishlist"),
      onPress: () => navigation.navigate("Wishlist"),
      rightContent: (
        <Box px={2} py={0.5} rounded="full" bg="primary.100">
          <Text fontSize="xs" fontWeight="600" color="primary.500">
            {wishlistBookIds?.length ?? 0}
          </Text>
        </Box>
      ),
    },
    {
      key: "library",
      icon: "auto-stories",
      label: i18n.t("my-library"),
      onPress: () => navigation.navigate("Library"),
      rightContent: (
        <Box px={2} py={0.5} rounded="full" bg="primary.100">
          <Text fontSize="xs" fontWeight="600" color="primary.500">
            {libraryBookIds?.length ?? 0}
          </Text>
        </Box>
      ),
    },
    {
      key: "language",
      icon: "translate",
      label: i18n.t("language"),
      onPress: () => { },
      rightContent: (
        <Menu
          w="140"
          trigger={(triggerProps) => (
            <Pressable {...triggerProps} hitSlop={10}>
              <HStack alignItems="center">
                <Text fontSize="sm" color="coolGray.600" fontWeight="500">
                  {languagePreference === "tr" ? "TR" : "EN"}
                </Text>

                <Icon
                  as={MaterialIcons}
                  name="expand-more"
                  size="sm"
                  color="coolGray.400"
                />
              </HStack>
            </Pressable>
          )}
        >
          {[
            { code: "tr", lang: i18n.t("turkish") },
            { code: "en", lang: i18n.t("english") },
          ].map((input) => (
            <Menu.Item key={input.code} onPress={() => handleLanguageChange(input.code)}>
              <HStack justifyContent="space-between" w="100%">
                <Text
                  color={languagePreference === input.code ? "primary.600" : "coolGray.700"}
                  fontWeight={languagePreference === input.code ? "600" : "400"}
                >
                  {input.lang}
                </Text>

                {languagePreference === input.code && (
                  <Icon as={MaterialIcons} name="check" size="sm" color="primary.500" />
                )}
              </HStack>
            </Menu.Item>
          ))}
        </Menu>
      ),
    },
    {
      key: "feedback",
      icon: "rate-review",
      label: i18n.t("feedback"),
      onPress: () => navigation.navigate("Feedback"),
    },
    {
      key: "logout",
      icon: "logout",
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
    <Screen full>
      <ScreenHeader
        title={i18n.t("profile")}
        onBack={() => navigation.goBack()}
      />

      <VStack flex={1} alignItems="center" space={6} px={6} pt={4}>

        {/* Profile Section */}
        <VStack alignItems="center" space={2}>
          <ImagePicker
            selectedImage={handleImageUpload}
            initialImage={imageData}
          />
          <Text fontSize="md" fontWeight="600" color="#111827">
            {name}
          </Text>
        </VStack>

        {/* Menu Section */}
        <VStack w="100%" space={1}>
          {menuItems.map(({ key, ...item }) => (
            <ProfileMenuItem key={key} {...item} />
          ))}
        </VStack>

        {/* Logout Dialog */}
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
