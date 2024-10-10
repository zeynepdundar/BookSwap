import {
  Button,
  Text,
  VStack,
  Image,
  Box,
  AspectRatio,
  IconButton,
  Icon,
} from "native-base";
import i18n from "../i18n";
import Screen from "../components/Screen";
import { MaterialIcons } from "@expo/vector-icons";
import { formatText, truncateText } from "../utils/helper";
import { useSelector } from "react-redux";
import { ImageBackground } from "react-native";

export default function TradeOfferAcceptedScreen({ navigation, route }) {
  const { user, receivedBook, offeredBook, conversationId } = route.params;
  const { firebaseUserId } = useSelector((state: any) => state.auth.user);


  const importUrl = require("../assets/images/radar.png");

  const goToChatScreen = () => {
    console.log("goToChatScreen",user, conversationId);
    navigation.replace("ChatScreen", {
      conversationId: conversationId,
      friend: user,
      currentUserId:firebaseUserId
    });
  };

  const navigateHome = () => {
    // TODO:Verify resetting the navigation stack. The current screen should not remain in the stack history, so users can't still use the back button to return to it
    navigation.navigate("HomeTabs", { screen: "Home" });
  };
  return (
    <Screen>
      <Box position="absolute" top="28px" left="28px" zIndex={99}>
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
      <ImageBackground
        source={importUrl}
        style={{
          flex: 1, 
          width: "100%",
          height: "50%",
          justifyContent: "center",
          top: "8%",
        }}
      >
        <VStack
          flex={1}
          width="100%"
          px={4}
          py={4}
          top="-130"
          alignItems="center"
          justifyContent="center"
        >
          <Box width="30%" h="200" p="2" bg="#fff" borderRadius="md" mb={4}>
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
            <Text fontSize={11} numberOfLines={3}>
              {truncateText(formatText(receivedBook.title), 36)}
            </Text>
          </Box>
          <Icon
            name="double-arrow"
            variant="solid"
            color="#fff"
            size="sm"
            mb="1"
            as={MaterialIcons}
          />
          <Box width="30%" h="200" p="2" bg="#fff" borderRadius="md" mt={4}>
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
            <Text fontSize={11} numberOfLines={3}>
              {truncateText(formatText(offeredBook.title), 36)}
            </Text>
          </Box>
          <Text mt="7">{i18n.t("you-have-accepted-the-request")}</Text>
          <Button variant="outline" onPress={goToChatScreen} mt="10">
            {i18n.t("send-message")}
          </Button>
        </VStack>
      </ImageBackground>
    </Screen>
  );
}
