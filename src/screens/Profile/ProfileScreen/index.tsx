import {
  Button,
  Center,
  Flex,
  Heading,
  Spacer,
  ChevronLeftIcon,
  Image,
  Box,
  Text,
  Pressable,
  Menu,
  VStack,
  HStack,
  Spinner,
} from "native-base";
import i18n from "@/i18n";
import Screen from "@/components/shared/Screen";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { useEffect, useRef, useState } from "react";
import ImagePicker from "@/components/shared/ImagePicker";
import auth from "@react-native-firebase/auth";
import { signOut } from "@/store/auth";
import { clearMessages } from "@/store/messages/messages-slice";
import { clearProfileData, setProfileData } from "@/store/profile";
import { RootState } from "@/store/types";
import AsyncStore from "@/utils/AsyncStore";
import { updateProfileAsync } from "@/store/profile";
import { AlertDialogBox } from "@/components/Modal/AlertDialogBox";

export default function ProfileScreen({ navigation }) {
  const libraryIcon = require("@/assets/images/icon/library-icon.png");
  const wishlistIcon = require("@/assets/images/icon/wishlist-icon.png");
  const languageIcon = require("@/assets/images/icon/language-icon.png");
  const feedbackIcon = require("@/assets/images/icon/feedback-icon.png");
  const logoutIcon = require("@/assets/images/icon/logout-icon.png");

  const profileData = useSelector((state: RootState) => state.profile.profile);
  const dispatch = useDispatch<AppDispatch>();

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  if (!profileData) {
    return (
      <Screen>
        <Center flex={1}>
          <Spinner size="lg" />
        </Center>
      </Screen>
    );
  }

  const { name, wishlistBook, libraryBook, languagePreference, imageData } =
    profileData;

  const handleLanguageChange = (selectedLanguage) => {
    i18n.locale = selectedLanguage;

    const updatedProfile = {
      ...profileData,
      languagePreference: selectedLanguage,
    };

    dispatch(updateProfileAsync({ profileData: updatedProfile }));
  };

  const handleImageUpload = (imageUri) => {
    const updatedProfile = {
      ...profileData,
      imageData: imageUri,
    };

    dispatch(updateProfileAsync({ profileData: updatedProfile }));
  };

  const signOutHandler = async (): Promise<void> => {
    try {
      await auth().signOut();
      dispatch(clearMessages());
      await AsyncStore.removeItem("authToken");
      dispatch(signOut());
      dispatch(clearProfileData());
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <Screen>
        <HStack
          alignItems="center"
          space="28%"
          justifyContent="space-between"
          w="100%"
          h="50px"
        >
          <Button
            variant="ghost"
            leftIcon={<ChevronLeftIcon size="6" color="#212325" pr="0" />}
            _pressed={{
              bg: "transparent",
            }}
            onPress={() => navigation.goBack()}
          />
          <Heading>{i18n.t("profile")}</Heading>
          <Spacer></Spacer>
        </HStack>
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

          {/* Wishlist */}
          <Pressable
            width={320}
            onPress={() => navigation.navigate("Wishlist")}
          >
            <Flex
              direction="row"
              alignItems="center"
              maxW={320}
              p="1"
              pb="5"
              mt="4"
              overflow="hidden"
              borderBottomColor="#f5f5f5"
              borderBottomWidth={2}
            >
              <Image source={wishlistIcon} alt="Library icon" />
              <Text ml={3} color="black.400" fontWeight="500" fontSize={16}>
                {i18n.t("my-wishlist")}
              </Text>
              <Spacer></Spacer>
              <Box
                alignSelf="center"
                rounded="md"
                maxW="20"
                px={2}
                py={0.5}
                _text={{
                  fontSize: "sm",
                  fontWeight: "medium",
                  color: "warmGray.50",
                  letterSpacing: "lg",
                }}
                bg="primary.50"
              >
                {wishlistBook?.length ?? 0}
              </Box>
            </Flex>
          </Pressable>

          {/* Library */}
          <Pressable width={320} onPress={() => navigation.navigate("Library")}>
            <Flex
              direction="row"
              alignItems="center"
              maxW={320}
              p="1"
              pb="5"
              mt="4"
              overflow="hidden"
              borderBottomColor="#f5f5f5"
              borderBottomWidth={2}
            >
              <Image source={libraryIcon} alt="Wishlist icon" />
              <Text ml={3} color="black.400" fontWeight="500" fontSize={16}>
                {i18n.t("my-library")}
              </Text>
              <Spacer></Spacer>
              <Box
                alignSelf="center"
                rounded="md"
                maxW="20"
                px={2}
                py={0.5}
                _text={{
                  fontSize: "sm",
                  fontWeight: "medium",
                  color: "warmGray.50",
                  letterSpacing: "lg",
                }}
                bg="primary.50"
              >
                {libraryBook?.length ?? 0}
              </Box>
            </Flex>
          </Pressable>

          {/* Language */}
          <Pressable width={320} onPress={() => console.log("Change language")}>
            <Flex
              direction="row"
              alignItems="center"
              maxW={320}
              p="1"
              pb="5"
              mt="4"
              overflow="hidden"
              borderBottomColor="#f5f5f5"
              borderBottomWidth={2}
            >
              <Image source={languageIcon} alt="Language selection icon" />
              <Text ml={3} color="black.400" fontWeight="500" fontSize={16}>
                {i18n.t("language")}
              </Text>
              <Spacer></Spacer>
              <Box maxW="20" px={1}>
                <Menu
                  w="106"
                  mr={18}
                  trigger={(triggerProps) => {
                    return (
                      <Pressable
                        accessibilityLabel="Language selection"
                        {...triggerProps}
                      >
                        <Text
                          fontSize="md"
                          fontWeight="medium"
                          color="black.700"
                          letterSpacing="lg"
                        >
                          {languagePreference?.toUpperCase()}
                        </Text>
                      </Pressable>
                    );
                  }}
                >
                  {[
                    { code: "tr", lang: i18n.t("turkish") },
                    { code: "en", lang: i18n.t("english") },
                  ].map((input, index) => (
                    <Menu.Item
                      key={index}
                      onPress={() => handleLanguageChange(input.code)}
                      disabled={languagePreference === input.code}
                    >
                      {input.lang}
                    </Menu.Item>
                  ))}
                </Menu>
              </Box>
            </Flex>
          </Pressable>

          {/* Feedback */}
          <Pressable
            width={320}
            onPress={() => navigation.navigate("Feedback")}
          >
            <Flex
              direction="row"
              alignItems="center"
              maxW={320}
              p="1"
              pb="5"
              mt="4"
              overflow="hidden"
              borderBottomColor="#f5f5f5"
              borderBottomWidth={2}
            >
              <Image source={feedbackIcon} alt="Feedback icon" />
              <Text ml={3} color="black.400" fontWeight="500" fontSize={16}>
                {i18n.t("feedback")}
              </Text>
              <Spacer></Spacer>
            </Flex>
          </Pressable>

          {/* Logout */}
          <Pressable width={320} onPress={() => setIsOpen(!isOpen)}>
            <Flex
              direction="row"
              alignItems="center"
              maxW={320}
              p="1"
              pb="5"
              mt="4"
              overflow="hidden"
              borderBottomColor="#f5f5f5"
              borderBottomWidth={2}
            >
              <Image source={logoutIcon} alt="Logout icon" />
              <Text ml={3} color="black.400" fontWeight="500" fontSize={16}>
                {i18n.t("logout")}
              </Text>
              <Spacer></Spacer>
            </Flex>
          </Pressable>

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
    </>
  );
}
