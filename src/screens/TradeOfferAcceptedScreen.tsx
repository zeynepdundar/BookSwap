import { useSelector } from "react-redux";
import {
  Button,
  Text,
  VStack,
  Spacer,
  Image,
  Box,
  AspectRatio,
} from "native-base";
import i18n from "../i18n";
import Screen from "../components/Screen";

export default function TradeOfferAcceptedScreen({ navigation, route }) {
  const { userId, receivedBook, offeredBook } = route.params;
  const { firebaseUserId } = useSelector((state: any) => state.auth.user);

  const importUrl = require("../assets/images/radar.png");
  const coverUrl = require("../assets/images/cover_2.png");

  const goToChatScreen = () => {
    navigation.replace("ChatScreen", {
      userId: userId,
      friendId: firebaseUserId, // or other params as needed
    });
  };
  return (
    <Screen>
      <VStack alignItems="center" justifyContent="center" height={"80%"}>
        <Image source={importUrl} alt="Profile Image" position="absolute" />
        <Box width="100" p="2" bg="#fff" mt="126px">
          <AspectRatio ratio={38 / 62}>
            <Image
              source={
                receivedBook?.coverUrl
                  ? { uri: receivedBook?.coverUrl }
                  : coverUrl
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
                  : coverUrl
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
