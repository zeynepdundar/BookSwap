import { useState } from "react";
import { useSelector } from "react-redux";
import {
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


export default function ProfileScreen({ navigation }) {
  const dispatch = useAppDispatch();

  const profileData = useSelector((state: any) => state.profile.profile);
  const wishlistBookIds = useSelector(selectWishlistBookIds);
  const libraryBookIds = useSelector(selectLibraryBookIds);

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  const { name, languagePreference, imageData } = profileData;

  const handleLanguageChange = (selectedLanguage: string) => {
    i18n.locale = selectedLanguage;

    dispatch(
      updateProfileAsync({
        id: profileData.id,
        languagePreference: selectedLanguage,
      })
    );
  };

  const handleImageUpload = (imageUri: string) => {
    dispatch(
      updateProfileAsync({
        id: profileData.id,
        imageData: imageUri,
      })
    );
  };

  const menuItems = [
    {
      key: "wishlist",
      icon: "bookmark-outline",
      label: i18n.t("my-wishlist"),
      onPress: () => navigation.navigate("Wishlist"),
      rightContent: (
        <Box
          size={6}
          rounded="full"
          bg="primary.100"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            fontSize="xs"
            fontFamily="poppins-semi-bold"
            color="primary.600"
          >
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
        <Box
          size={6}
          rounded="full"
          bg="primary.100"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            fontSize="xs"
            fontFamily="poppins-semi-bold"
            color="primary.600"
          >
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
          trigger={(props) => (
            <Pressable {...props} hitSlop={10}>
              <HStack alignItems="center" space={1}>
                <Text fontSize="sm" color="gray.500">
                  {languagePreference === "tr" ? "TR" : "EN"}
                </Text>
                <Icon
                  as={MaterialIcons}
                  name="expand-more"
                  size="sm"
                  color="gray.400"
                />
              </HStack>
            </Pressable>
          )}
        >
          {[
            { code: "tr", label: i18n.t("turkish") },
            { code: "en", label: i18n.t("english") },
          ].map((item) => (
            <Menu.Item
              key={item.code}
              onPress={() => handleLanguageChange(item.code)}
            >
              <HStack justifyContent="space-between" w="100%">
                <Text
                  color={
                    languagePreference === item.code
                      ? "primary.500"
                      : "gray.700"
                  }
                  fontWeight={
                    languagePreference === item.code ? "600" : "400"
                  }
                >
                  {item.label}
                </Text>

                {languagePreference === item.code && (
                  <Icon
                    as={MaterialIcons}
                    name="check"
                    size="sm"
                    color="primary.500"
                  />
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

  const signOutHandler = async () => {
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
      <ScreenHeader title={i18n.t("profile")} />

      <VStack flex={1} alignItems="center" space={6} px={6} pt={4}>
        {/* Profile */}
        <VStack alignItems="center" space={2}>
          <ImagePicker
            selectedImage={handleImageUpload}
            initialImage={imageData}
          />
          <Text
            fontSize="xl"
            fontFamily="poppins-semi-bold"
            color="gray.900"
          >
            {name}
          </Text>
        </VStack>

        {/* Menu */}
        <VStack w="100%" space={2}>
          {menuItems.map(({ key, ...item }) => (
            <ProfileMenuItem key={key} {...item} />
          ))}
        </VStack>

        {/* Logout */}
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