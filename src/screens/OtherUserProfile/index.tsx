import {
  Button,
  Center,
  Flex,
  Heading,
  Spacer,
  ArrowBackIcon,
  Box,
  VStack,
  HStack,
  Avatar,
  Pressable,
  useColorModeValue,
  Image,
} from "native-base";
import Screen from "../../components/Screen";
import { useCallback, useState } from "react";
import { SceneMap, TabView } from "react-native-tab-view";
import { Dimensions, StatusBar, Animated } from "react-native";
import OtherLibraryScreen from "./OtherUserLibraryScreen";
import OtherWishlistScreen from "./OtherUserWishlistScreen";
import OtherSwapHistory from "./OtherUserSwapHistory";
import { fetchUserProfileData } from "../../api/service";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { useFocusEffect } from "@react-navigation/native";

export default function OtherUserProfileScreen({ navigation, route }) {
  const userTemp = route?.params?.user;

  const otherUserImage = require("../../assets/images/jesse-pinkman-profile.png");

  const [profile, setProfile] = useState(null);
  const [libraryBook, setLibraryBook] = useState(null);
  const [wishedBook, setWishedBook] = useState(null);
  const [historyList, setHistoryList] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchProfileData = async () => {
        try {
          setLoading(true);
          const profileData = await fetchUserProfileData(
            userTemp?.firebase_uid
          );
          setProfile({
            firebase_uid: userTemp?.firebase_uid,
            id: profileData.id,
            name: profileData.name,
            photo_file_name: profileData.imageData,
          });
          setLibraryBook(profileData.libraryBook);
          setWishedBook(profileData.wishlistBook);
          setHistoryList(profileData.historyList);
        } catch (error) {
          console.error("Error fetching profile data:", error);
          // Set an error state here if needed
        } finally {
          setLoading(false);
        }
      };

      fetchProfileData();
    }, [userTemp, route?.params])
  );

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

  const renderScene = SceneMap({
    library: (props: any) => (
      <OtherLibraryScreen
        {...props}
        navigation={navigation}
        profile={profile}
        libraryBook={libraryBook}
      />
    ),
    wishlist: (props: any) => (
      <OtherWishlistScreen
        {...props}
        navigation={navigation}
        profile={profile}
        wishedBook={wishedBook}
      />
    ),
    swapHistory: (props: any) => (
      <OtherSwapHistory
        {...props}
        navigation={navigation}
        profile={profile}
        historyList={historyList}
      />
    ),
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
            >
              <Pressable
                onPress={() => {
                  setIndex(i);
                }}
              >
                <Animated.Text
                  style={{
                    color,
                    fontWeight: "700",
                    fontFamily: "Poppins.200",
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
  if (loading) {
    return <LoadingOverlay></LoadingOverlay>;
  }

  return (
    <Screen>
      <VStack space={1} alignItems="center" height={"100%"} width="100%">
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
            <Image
              source={{ uri: userTemp.photo_file_name }}
              alt="Profile Image"
              size="60z"
              rounded="full"
            />
            <Heading width="60%" color="black.100" my={3}>
              {profile?.name}
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
          renderTabBar={(props) => renderTabBar({ ...props })}
          onIndexChange={setIndex}
          style={{
            flex: 1,
            width: "100%",
            marginTop: StatusBar.currentHeight || 0, 
          }}
        />
      </VStack>
    </Screen>
  );
}
