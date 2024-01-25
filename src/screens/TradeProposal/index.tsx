import {
  Button,
  Center,
  Heading,
  Spacer,
  ArrowBackIcon,
  Image,
  Box,
  Text,
  Pressable,
  VStack,
  HStack,
  Fab,
  Icon,
  AspectRatio,
  Badge,
  CloseIcon,
  Avatar,
} from "native-base";
import i18n from "../../i18n";
import Screen from "../../components/Screen";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useState } from "react";

import { MaterialIcons } from "@expo/vector-icons";

import auth from "@react-native-firebase/auth";
import { signOut } from "../../store/auth-slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  clearProfileData,
  setLanguagePreference,
} from "../../store/profile-slice";
interface TradeProposal {
  receiverId: string;
  offeredBook: any;
  requestedBook: any;
}
export default function TradeProposal({ navigation, route }) {


  const { name, wishlistBook, libraryBook, languagePreference, imageData } =
    useSelector((state: any) => state.profile.profile);
    const user = route?.params?.data?.user;
    const book = route?.params?.data?.book;
    console.log("TradeProposal: ", route?.params)

    const initialState:TradeProposal ={  receiverId: "5",
      offeredBook: null,
      requestedBook: book}


  const [sentPropasal, setSentProposal] = useState<TradeProposal | null>(initialState);

  const dispatch = useDispatch<AppDispatch>();

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const handleLanguageChange = (selectedLanguage) => {
    dispatch(setLanguagePreference(selectedLanguage));
    // You can add additional logic if needed
  };

  const signOutHandler = async (): Promise<void> => {
    try {
      // Sign out the user from Firebase
      await auth().signOut();
      dispatch(clearProfileData());

      // Dispatch the logout action to clear user data in Redux state
      AsyncStorage.removeItem("authToken");
      dispatch(signOut());

      // Other actions after logout...
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const handleSelectImage = (data) => {
    // setImage(data)
  };
  const importUrl = require("../../assets/images/cover_2.png");
  const tradeIcon = require("../../assets/images/icon/trade-icon.png");
  const profilePhoto = require("../../assets/images/lalo-salamanca.png");

  const handleAddToReceivedBook = (data) => {
    setSentProposal((prevProposal) => ({
      ...prevProposal,
      requestedBook: data,
    }));
    console.log("Add to Received Book", data, sentPropasal);
  };

  return (
    <Screen>
      <HStack
        alignItems="center"
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
        <Center flex={8}>
          <Heading>{i18n.t("trade-proposal")}</Heading>
        </Center>
        <Spacer></Spacer>
      </HStack>
      <VStack>
        <Box m="2" width="90%" alignSelf="center">
          <Text fontWeight="500" fontSize="md" mb="3">
            {i18n.t("book-you-will-give")}
          </Text>
          <Center
            p="2"
            borderWidth="1"
            borderRadius="10"
            width="100%"
            borderColor="#EEEEEE"
            shadow={0.9}
            height="200"
            overflow="hidden"
          >
            <Center
              borderWidth="1"
              borderRadius="10"
              borderColor="#EEEEEE"
              shadow={0.9}
              width="43%"
              height="180"
              overflow="hidden"
            >
              {sentPropasal?.offeredBook &&
                <>
                  <Box width="100" p="2" mt="0">
                    <AspectRatio ratio={41 / 62}>
                      <Image
                        source={importUrl}
                        alt={`Cover of`}
                        w="90px"
                        h="130px"
                      />
                    </AspectRatio>
                    <Pressable
                      onPress={() =>
                        setSentProposal((prevProposal) => ({
                          ...prevProposal,
                          offeredBook: null,
                        }))
                      }
                      position="absolute"
                      right={0}
                      top={0}
                    >
                      <Badge
                        rounded="100"
                        width={7}
                        height={7}
                        bg="rgba(140, 140, 140, 0.7)"
                      >
                        <CloseIcon fontSize={10} color="coolGray.800" />
                      </Badge>
                    </Pressable>
                  </Box>
                  <Text fontSize={11}>{sentPropasal.offeredBook.title}</Text>
                </>
              }
              {!sentPropasal?.offeredBook && (
                <Fab
                  onPress={() =>
                    navigation.navigate("ProfileStack", { screen: "Library" })
                  }
                  renderInPortal={false}
                  shadow={2}
                  size="9"
                  mr="7"
                  mb="12"
                  bgColor="primary.50"
                  icon={
                    <Icon
                      color="white"
                      as={MaterialIcons}
                      name="add"
                      size="md"
                    />
                  }
                />
              )}
            </Center>
          </Center>
        </Box>
        <Image source={tradeIcon} alt=" Library" m="2" alignSelf="center" />

        <Box m="2" width="90%" alignSelf="center">
          <Text fontWeight="500" fontSize="md" mb="3">
            {i18n.t("book-you-will-receive")}
          </Text>
          <Center
            p="2"
            borderWidth="1"
            borderRadius="10"
            width="100%"
            borderColor="#EEEEEE"
            shadow={0.9}
            height="200"
            overflow="hidden"
          >
            <Center
              borderWidth="1"
              borderRadius="10"
              borderColor="#EEEEEE"
              shadow={0.9}
              width="43%"
              height="180"
              overflow="hidden"
            >
              {sentPropasal?.requestedBook && (
                <>
                  <Box width="100" p="2" mt="0">
                    <AspectRatio ratio={41 / 62}>
                      <Image
                        source={importUrl}
                        alt={`Cover of`}
                        w="90px"
                        h="130px"
                      />
                    </AspectRatio>
                    <Pressable
                      onPress={() =>
                        setSentProposal((prevProposal) => ({
                          ...prevProposal,
                          requestedBook: null,
                        }))
                      }
                      position="absolute"
                      right={0}
                      top={0}
                    >
                      <Badge
                        rounded="100"
                        width={7}
                        height={7}
                        bg="rgba(140, 140, 140, 0.7)"
                      >
                        <CloseIcon fontSize={10} color="coolGray.800" />
                      </Badge>
                    </Pressable>
                  </Box>
                  <Text fontSize={11}>{sentPropasal.requestedBook.title}</Text>
                </>
              )}
              {!sentPropasal?.requestedBook && (
                <Fab
                  onPress={() =>
                    navigation.navigate("OtherLibrary", {
                      user: "hb",
                      onDonePress: handleAddToReceivedBook,
                    })
                  }
                  renderInPortal={false}
                  shadow={2}
                  size="9"
                  mr="7"
                  mb="12"
                  bgColor="primary.50"
                  icon={
                    <Icon
                      color="white"
                      as={MaterialIcons}
                      name="add"
                      size="md"
                    />
                  }
                />
              )}
            </Center>
          </Center>
        </Box>
        <HStack justifyContent="flex-end" mr="4" my="3">
          <VStack mr="2">
            <Box alignItems="flex-end">
              <Text color="#8c8c8c" pt="1">
                Trade with
              </Text>
            </Box>

            <Text textAlign="right">{user.name}</Text>
          </VStack>

          <AspectRatio w="39">
            <Avatar source={profilePhoto} size="50" />
          </AspectRatio>
        </HStack>
        {/* <Button
          onPress={() => {
            sendOfferHandler(item.id);
          }}
          variant="primary"
          p={2}
          px="0"
          width={126}
        >
          {i18n.t("send-offer")}
        </Button> */}
      </VStack>
      <Button m="7" variant="primary" onPress={null}>
        {i18n.t("send-offer")}
      </Button>
    </Screen>
  );
}
// "book-you-will-give": "Vereceğin kitap",
// "book-you-will-receive": "Alacağın kitap",
