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
  const { user, receivedBook, offeredBook, conversationId } = route.params || {};
  const { firebaseUserId } = useSelector((state: any) => state.auth.user);
  const importUrl = require("../assets/images/radar.png");

  const goToChatScreen = () => {
    navigation.replace("ChatScreen", {
      conversationId: conversationId,
      friend: user,
      currentUserId:firebaseUserId
    });
  };

  const navigateHome = () => {
    // TODO:Verify resetting the navigation stack. The current screen should not remain in the stack history, so users can't still use the back button to return to it
    // navigation.navigate("HomeTabs", { screen: "Home" });
  };
  return (
    <Screen>
      {/* <Box position="absolute" top="28px" left="28px" zIndex={99}>
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
      </Box> */}
      <ImageBackground
        source={importUrl}
        style={{ flex: 1, width: "100%", height: "100%", justifyContent: "center" }}
        resizeMode="cover"
      >
<Text>fdf</Text>
      </ImageBackground>
    </Screen>
  );
}
