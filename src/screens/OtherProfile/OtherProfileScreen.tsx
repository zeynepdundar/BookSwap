import {
  Button,
  Center,
  Flex,
  Heading,
  Spacer,
  ArrowBackIcon,
  Box,
  Pressable,
  VStack,
  HStack,
  useColorModeValue,
  Avatar,
} from "native-base";
import i18n from "../../i18n";
import Screen from "../../components/Screen";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { signOut } from "../../store/auth-actions";
import { useState } from "react";
import { AlertDialogBox } from "../../components/AlertDialogBox";
import { SceneMap, TabView } from "react-native-tab-view";
import { Dimensions, StatusBar, Animated } from "react-native";
import OtherLibraryScreen from "./OtherLibraryScreen";
import OtherWishlistScreen from "./OtherWishlistScreen";
import OtherSwapHistory from "./OtherSwapHistory";

export default function OtherProfileScreen({ navigation }) {
  const otherUserImage = require("../../assets/images/jesse-pinkman-profile.png");

  const dispatch = useDispatch<AppDispatch>();

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const signOutHandler = async (): Promise<void> => {
    dispatch(signOut());
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "library",
      title: "Library",
    },
    {
      key: "wishlist",
      title: "Wishlist",
    },
    {
      key: "swapHistory",
      title: "History",
    },
  ]);

  const initialLayout = {
    width: Dimensions.get("window").width,
  };
  const renderScene = SceneMap({
    library: OtherLibraryScreen,
    wishlist: OtherWishlistScreen,
    swapHistory: OtherSwapHistory,
  });
  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });
          const color =
            index === i
              ? useColorModeValue("#7F3DFF", "#e5e5e5")
              : useColorModeValue("#8C8C8C", "#a1a1aa");
          const borderColor =
            index === i
              ? "primary.50"
              : useColorModeValue("coolGray.200", "gray.400");
          return (
            <Box
              paddingTop={0}
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
              mx="2"
              cursor="pointer"
            >
              <Pressable
            
                onPress={() => {
                  console.log(i);
                  setIndex(i);
                }}
              >
                <Animated.Text
                  style={{
                    color,
                    fontWeight:"700",
                    fontFamily: "Poppins.200"
                  }}
                >
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <Screen>
      <VStack
        space={1}
        alignItems="center"
        height={"100%"}
        width="100%"
      >
        <Center w="100%" h="10" justifyContent="space-between">
          <Flex direction="row" justifyContent="space-between" w="100%" h="10">
            <Button
              backgroundColor="transparent"
              variant="ghost"
              leftIcon={<ArrowBackIcon size="6" color="#212325" pr="0" />}
              _pressed={{
                bg: "transparent",
              }}
              onPress={() => navigation.goBack()}
            ></Button>
          </Flex>
        </Center>
        <Box w="100%" h="20" px={6}>
          <HStack
            space={3}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            w="100%"
            h="100%"
          >
            <Avatar
              width="25%"
              height="100%"
              source={otherUserImage}
            />
            <Heading width="60%" color="black.100" my={3}>
              Walter White
            </Heading>
            <Spacer></Spacer>
          </HStack>
        </Box>
        <TabView
          navigationState={{
            index,
            routes,
          }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          style={{
            marginTop: StatusBar.currentHeight,
            width: "100%",
          }}
        />
      </VStack>
      <AlertDialogBox
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={signOutHandler}
        title={i18n.t("logout")}
        description={i18n.t("are-you-sure-log-out")}
        cancelButtonLabel={i18n.t("cancel")}
        confirmButtonLabel={i18n.t("logout")}
      ></AlertDialogBox>
    </Screen>
  );
}
