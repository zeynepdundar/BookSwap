import {
  Button,
  Text,
  VStack,
  Box,
  Heading,
  Icon,
  IconButton,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import Screen from "../../components/shared/Screen";
import { ImageBackground } from "react-native";
import { useSelector } from "react-redux";

export default function TradeOfferAcceptedScreen({ navigation, route }) {
  const { user, conversationId } = route.params || {};
  const { firebaseUserId } = useSelector((state: any) => state.auth.user);

  const importUrl = require("../../assets/images/radar.png");

  const goToChatScreen = () => {
    navigation.replace("ChatScreen", {
      conversationId,
      friend: user,
      currentUserId: firebaseUserId,
    });
  };

  const goHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "HomeTabs" }],
    });
  };

  return (
    <Screen>
      <ImageBackground
        source={importUrl}
        style={{ flex: 1 }}
        resizeMode="contain"   // 👈 IMPORTANT: avoids zoom/crop
      >

        {/* readability layer ONLY */}
        <Box flex={1} bg="rgba(255,255,255,0.15)">

          {/* close button */}
          <Box position="absolute" top={12} right={4}>
            <IconButton
              onPress={goHome}
              borderRadius="full"
              bg="rgba(255,255,255,0.9)"
              icon={
                <Icon
                  as={MaterialIcons}
                  name="close"
                  size="md"
                  color="black"
                />
              }
            />
          </Box>

          {/* content */}
          <VStack
            flex={1}
            justifyContent="center"
            alignItems="center"
            space={5}
            px={6}
          >

            {/* icon */}
            <Box bg="white" p={5} borderRadius="full" shadow={3}>
              <Icon
                as={MaterialIcons}
                name="check-circle"
                size="6xl"
                color="green.500"
              />
            </Box>

            {/* title */}
            <Heading textAlign="center" color="black">
              Trade Accepted
            </Heading>

            {/* text (fixed readability) */}
            <Box
              bg="rgba(255,255,255,0.75)"
              px={5}
              py={3}
              borderRadius="xl"
            >
              <Text textAlign="center" color="gray.800">
                Your exchange has been successfully matched.
                You can now continue chatting with the other user.
              </Text>
            </Box>

            {/* buttons */}
            <VStack space={3} width="100%" mt={6}>
              <Button onPress={goToChatScreen} borderRadius="xl">
                Open Chat
              </Button>

              <Button onPress={goHome} variant="outline" borderRadius="xl">
                Back to Home
              </Button>
            </VStack>

          </VStack>
        </Box>
      </ImageBackground>
    </Screen>
  );
}