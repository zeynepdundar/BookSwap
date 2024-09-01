import { useSelector } from "react-redux";
import {
  Button,
  Text,
  VStack,
  Spacer,
  Image,
  Box,
  AspectRatio,
  IconButton,
  Icon,
} from "native-base";
import i18n from "../i18n";
import Screen from "../components/Screen";
import { MaterialIcons } from "@expo/vector-icons";
import {
  CommonActions,
  StackActions,
  useNavigation,
} from "@react-navigation/native";

export default function TradeOfferAcceptedScreen({ navigation, route }) {
  const { userId, receivedBook, offeredBook } = route.params;
  const { firebaseUserId } = useSelector((state: any) => state.auth.user);
  const navigatiod = useNavigation();

  const importUrl = require("../assets/images/radar.png");

  const goToChatScreen = () => {
    navigation.replace("ChatScreen", {
      userId: userId,
      friendId: firebaseUserId, // or other params as needed
    });
  };

  const navigateHome = () => {
    // TODO:Verify resetting the navigation stack. The current screen should not remain in the stack history, so users can't still use the back button to return to it
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };
  return (
    <Screen>
      <VStack alignItems="center" justifyContent="center" height={"80%"}>
        <Image source={importUrl} alt="Profile Image" position="absolute" />

        <Box position="absolute" top="8px" right="8px" zIndex={99}>
          <IconButton
            onPress={navigateHome}
            size="10"
            borderRadius="full"
            bg="#dddddd"
            _pressed={{
              bg: "primary.100",
            }}
            icon={
              <Icon color="black" name={"close"} as={MaterialIcons} size="lg" />
            }
          />
        </Box>
        <Box width="100" p="2" bg="#fff" mt="126px">
          <AspectRatio ratio={38 / 62}>
            <Image
              source={
                receivedBook?.coverUrl
                  ? { uri: receivedBook?.coverUrl }
                  : {
                    uri: "https://lightning.od-cdn.com/static/img/no-cover_en_US.a8920a302274ea37cfaecb7cf318890e.jpg",
                  }
              }
              alt={`Cover of`}
            />
          </AspectRatio>
          <Text fontSize={11}>{receivedBook.title}</Text>
        </Box>
        <Box width="100" p="2" bg="#fff" mt="9">
          <AspectRatio ratio={38 / 62}>
            <Image
              source={
                offeredBook?.coverUrl
                  ? { uri: offeredBook?.coverUrl }
                  : {
                    uri: "https://lightning.od-cdn.com/static/img/no-cover_en_US.a8920a302274ea37cfaecb7cf318890e.jpg",
                  }
              }
              alt={`Cover of`}
            />
          </AspectRatio>
          <Text fontSize={11}>{offeredBook.title}</Text>
        </Box>
        <Text mt="7">{i18n.t("you-have-accepted-the-request")}</Text>
        <Spacer></Spacer>
        <Button variant="outline" onPress={goToChatScreen}>
          {i18n.t("send-message")}
        </Button>
      </VStack>
    </Screen>
  );
}
