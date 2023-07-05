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
} from "native-base";
import i18n from "../i18n";
import Screen from "../components/Screen";

export default function ProfileScreen({ navigation }) {
  const libraryIcon = require("../assets/images/icon/library-icon.png");
  const wishlistIcon = require("../assets/images/icon/wishlist-icon.png");
  const languageIcon = require("../assets/images/icon/language-icon.png");
  const feedbackIcon = require("../assets/images/icon/feedback-icon.png");
  const logoutIcon = require("../assets/images/icon/logout-icon.png");
  const profilePhoto = require("../assets/images/profile.png");

  return (
    <Screen>
      <Flex direction="row" justifyContent="space-between" alignItems="center">
        <Button
          variant="ghost"
          leftIcon={<ArrowBackIcon size="6" color="#212325" />}
          _pressed={{
            bg: "transparent",
          }}
          onPress={() => navigation.goBack()}
        ></Button>
        <Heading>{i18n.t("profile")}</Heading>
        <Heading>---</Heading>
      </Flex>
      <Center>
        <Flex direction="column" justifyContent="justify" m={1}>
          <Center>
            <Image
              size={150}
              alt="fallback text"
              borderRadius={100}
              source={profilePhoto}
            />
            <Heading color="black.100" mb={10}>
              Iriana Saliha
            </Heading>
          </Center>
        </Flex>
      </Center>
      <Center>
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
            <Box maxW="20" px={1} >
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
                <Menu.Item textValue="en" isDisabled>English</Menu.Item>
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
        <Pressable width={320} onPress={() => console.log("Logged out")}>
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
      </Center>
    </Screen>
  );
}
