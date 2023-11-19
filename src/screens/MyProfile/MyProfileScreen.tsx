import {
  Button,
  Center,
  Flex,
  Heading,
  Spacer,
  ArrowBackIcon,
  Image,
  Box,
  Text,
  Pressable,
  Menu,
  VStack,
  HStack,
} from "native-base";
import i18n from "../../i18n";
import Screen from "../../components/Screen";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { signOut } from "../../store/auth-actions";
import { useState } from "react";
import { AlertDialogBox } from "../../components/AlertDialogBox";
import ImagePicker from "../../components/ImagePicker";

export default function ProfileScreen({ navigation }) {
  const libraryIcon = require("../../assets/images/icon/library-icon.png");
  const wishlistIcon = require("../../assets/images/icon/wishlist-icon.png");
  const languageIcon = require("../../assets/images/icon/language-icon.png");
  const feedbackIcon = require("../../assets/images/icon/feedback-icon.png");
  const logoutIcon = require("../../assets/images/icon/logout-icon.png");

  const dispatch = useDispatch<AppDispatch>();

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const signOutHandler = async (): Promise<void> => {
    dispatch(signOut());
  };

  return (
    <Screen>
      <HStack
        alignItems="center"
        space="26%"
        justifyContent="space-between"
        w="100%"
        h={16}
      >
        <Button
          variant="ghost"
          leftIcon={<ArrowBackIcon size="6" color="#212325" pr="0" />}
          _pressed={{
            bg: "transparent",
          }}
          onPress={() => navigation.goBack()}
        ></Button>
        <Heading>{i18n.t("profile")}</Heading>
        <Spacer></Spacer>
      </HStack>
      <VStack space={1} alignItems="center" height={"50%"}>
        <Center w="100%" h="215px" px={6}>
          <ImagePicker selectedImage={true} />
          <Heading color="black.100" my={3}>
            Jesse Pinkman
          </Heading>
        </Center>

        {/* Wishlist */}
        <Pressable
          width={320}
          onPress={() => navigation.navigate("MyWishlist")}
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
              347
            </Box>
          </Flex>
        </Pressable>

        {/* Library */}
        <Pressable width={320} onPress={() => navigation.navigate("MyLibrary")}>
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
            <Image source={libraryIcon} alt="Wishlist icon" />{" "}
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
              52
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
                w="100"
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
                        EN
                      </Text>
                    </Pressable>
                  );
                }}
              >
                <Menu.Item textValue="tr">Turkish</Menu.Item>
                <Menu.Item textValue="en" isDisabled>
                  English
                </Menu.Item>
              </Menu>
            </Box>
          </Flex>
        </Pressable>

        {/* Feedback */}
        <Pressable width={320} onPress={() => console.log("Write feedback")}>
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
  );
}
